import { AmapPromise } from '../config/symbolVariable';
import { watch, shallowRef, provide, inject, onUnmounted } from 'vue';
import upperCamelCase from 'uppercamelcase';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function convertSignalProp(key, sourceData, converter) {
    if (converter && converter[key]) {
        return converter[key](sourceData);
    }
    else {
        return sourceData;
    }
}
function convertProps(propsData, converters) {
    const cvProps = {};
    return Object.keys(propsData).reduce((res, _key) => {
        const key = _key;
        const propsValue = convertSignalProp(key, propsData[key], converters);
        if (propsValue === undefined) {
            return res;
        }
        cvProps[key] = propsValue;
        return res;
    }, cvProps);
}

function registerEvents(amapInstance, props, eventKeys) {
    if (!amapInstance) {
        return;
    }
    eventKeys.map(key => {
        if (props[key]) {
            for (const eventName in props[key]) {
                if (key.includes('once')) {
                    amapInstance.on &&
                        amapInstance.on(eventName, props[key][eventName], null, true);
                }
                else {
                    amapInstance.on && amapInstance.on(eventName, props[key][eventName]);
                }
            }
        }
    });
}
function unregisterEvents(amapInstance) {
    if (!amapInstance) {
        return;
    }
    amapInstance.clearEvents && amapInstance.clearEvents('');
}

function getHandlerFun(prop, amapInstance, handlers) {
    if (handlers && handlers[prop]) {
        return handlers[prop];
    }
    return amapInstance[`set${upperCamelCase(prop)}`] || amapInstance.setOptions;
}
function propWatchFn(propsData, key, amapInstance, handleFun, converters, editInfo) {
    if (propsData[key] === undefined) {
        return;
    }
    if (key === 'events' || key === 'onceEvents') {
        unregisterEvents(amapInstance);
        registerEvents(amapInstance, propsData, ['events', 'onceEvents']);
        return;
    }
    if (key === 'editEvents') {
        unregisterEvents(editInfo.edit.value);
        registerEvents(editInfo.edit.value, propsData, ['editEvents']);
        return;
    }
    if (handleFun && handleFun === amapInstance.setOptions) {
        return handleFun.call(amapInstance, {
            [key]: convertSignalProp(key, propsData[key], converters),
        });
    }
    if (key === 'editable') {
        const editCoverPorpsData = convertSignalProp(key, propsData[key], converters);
        if (editCoverPorpsData === true && editInfo.edit.value === undefined) {
            editInfo.edit.value = editInfo.editInit();
            unregisterEvents(editInfo.edit.value);
            registerEvents(editInfo.edit.value, propsData, ['editEvents']);
        }
    }
    handleFun.call(amapInstance, convertSignalProp(key, propsData[key], converters));
}
function unInstallWatchFns(unwatchFns) {
    unwatchFns.forEach(unwatch => unwatch());
    return [];
}
function setPropWatchers(propsData, amapInstance, handlers, converters, editInfo) {
    const unwatchFns = [];
    Object.keys(propsData).forEach(prop => {
        const handleFun = getHandlerFun(prop, amapInstance, handlers);
        if (!handleFun && prop !== 'events')
            return;
        propWatchFn(propsData, prop, amapInstance, handleFun, converters, editInfo);
        const unWatch = watch(() => propsData[prop], () => {
            propWatchFn(propsData, prop, amapInstance, handleFun, converters, editInfo);
        });
        unwatchFns.push(unWatch);
    });
    return {
        unwatchFns,
    };
}

function useRegisterComponent(props, initFn, transferredProps, getAmapPromise) {
    const amapInstance = shallowRef(null);
    const amapComponent = shallowRef(null);
    const editor = shallowRef(undefined);
    const coverPropsUnWatch = shallowRef([]);
    const getAmapInstancePromise = shallowRef();
    if (Object.prototype.toString.call(getAmapPromise) === '[object Function]') {
        getAmapInstancePromise.value = getAmapPromise();
        provide(AmapPromise, getAmapInstancePromise);
    }
    else {
        getAmapInstancePromise.value = inject(AmapPromise);
    }
    const amapInstanceWatcher = watch(() => getAmapInstancePromise.value, newAmapInstancePromise => {
        newAmapInstancePromise.then(() => {
            unAmapObj();
            initAmapObj();
        });
    }, { immediate: true });
    function reloadAmapInstancePromise(reloadPromise) {
        getAmapInstancePromise.value = reloadPromise();
        getAmapInstancePromise.value.then(() => {
            unAmapObj();
            initAmapObj();
        });
    }
    function initAmapObj() {
        return __awaiter(this, void 0, void 0, function* () {
            const amapObj = yield getAmapInstancePromise.value;
            amapInstance.value = amapObj;
            const converterProps = convertProps(props, transferredProps === null || transferredProps === void 0 ? void 0 : transferredProps.converters);
            const amapComponentInit = initFn.amapInitCb(amapInstance.value, converterProps);
            if (Object.prototype.toString.call(amapComponentInit) === '[object Promise]') {
                const comInstance = yield amapComponentInit;
                amapComponent.value = comInstance;
            }
            else {
                amapComponent.value = amapComponentInit;
            }
            const { unwatchFns } = setPropWatchers(props, amapComponent.value, transferredProps === null || transferredProps === void 0 ? void 0 : transferredProps.handlers, transferredProps === null || transferredProps === void 0 ? void 0 : transferredProps.converters, {
                edit: editor,
                editInit: () => {
                    return initFn.editorInit(amapInstance.value, amapComponent.value, converterProps);
                },
            });
            coverPropsUnWatch.value = unwatchFns;
        });
    }
    function unAmapObj() {
        const componentInstance = amapComponent.value;
        const editorInstance = editor.value;
        if (componentInstance) {
            unregisterEvents(componentInstance);
            if ('setMap' in componentInstance) {
                componentInstance.setMap(null);
            }
            if ('close' in componentInstance) {
                componentInstance.close();
            }
            unregisterEvents(editorInstance);
            editorInstance && editorInstance.close();
        }
        coverPropsUnWatch.value.forEach(unwatch => unwatch());
    }
    onUnmounted(() => {
        unAmapObj();
        amapInstanceWatcher();
    });
    return {
        amapComponent,
        editor,
        reloadAmapInstancePromise,
    };
}

export { convertProps, convertSignalProp, registerEvents, setPropWatchers, unInstallWatchFns, unregisterEvents, useRegisterComponent };
