"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBookingContext = exports.BookingProvider = exports.BookingContext = void 0;
var react_1 = __importStar(require("react"));
var initialState = {
    id: '',
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    returnDate: undefined,
    vehicleType: '',
    fare: 0,
    customerId: '',
    status: 'pending'
};
var _reducer = function (state, action) {
    switch (action.type) {
        case 'SET_BOOKING':
            return __assign(__assign({}, state), action.payload);
        case 'RESET_BOOKING':
            return initialState;
        default:
            return state;
    }
};
exports.BookingContext = (0, react_1.createContext)({
    state: initialState,
    dispatch: function () { return null; }
});
var BookingProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useReducer)(_reducer, initialState), state = _b[0], dispatch = _b[1];
    return (react_1.default.createElement(exports.BookingContext.Provider, { value: { state: state, dispatch: dispatch } }, children));
};
exports.BookingProvider = BookingProvider;
var useBookingContext = function () { return (0, react_1.useContext)(exports.BookingContext); };
exports.useBookingContext = useBookingContext;
