module.exports = [
"[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/ui/badge.tsx
__turbopack_context__.s([
    "default",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Badge({ children, variant = "default", className = "" }) {
    const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide";
    const variants = {
        success: "bg-green-100 text-green-800",
        danger: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-blue-100 text-blue-800",
        default: "bg-gray-100 text-gray-800"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `${baseStyles} ${variants[variant]} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/cocinero/comandas/comanda-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComandaCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
;
;
function ComandaCard({ comanda, onClick }) {
    const bgColores = {
        pendiente: "bg-yellow-50 border-yellow-500 hover:bg-yellow-100",
        en_cocina: "bg-blue-50 border-blue-500 hover:bg-blue-100",
        listo: "bg-green-50 border-green-500 hover:bg-green-100",
        cancelado: "bg-gray-50 border-gray-500 hover:bg-gray-100"
    };
    const badgeVariants = {
        pendiente: "warning",
        en_cocina: "info",
        listo: "success",
        cancelado: "info"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>onClick(comanda),
        className: `p-4 rounded-xl border-l-4 shadow-sm transition-all text-left flex flex-col justify-between h-28 ${bgColores[comanda.estado]}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-lg text-gray-800",
                        children: comanda.id_mesa.nombre
                    }, void 0, false, {
                        fileName: "[project]/src/components/cocinero/comandas/comanda-card.tsx",
                        lineNumber: 34,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: badgeVariants[comanda.estado],
                        children: comanda.estado
                    }, void 0, false, {
                        fileName: "[project]/src/components/cocinero/comandas/comanda-card.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/cocinero/comandas/comanda-card.tsx",
                lineNumber: 33,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-600 mt-2 font-medium",
                children: [
                    "👤 ",
                    comanda.id_mesa.capacidad,
                    " pers. | 📍 ",
                    comanda.id_mesa.ubicacion
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/cocinero/comandas/comanda-card.tsx",
                lineNumber: 37,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/cocinero/comandas/comanda-card.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/cocinero/comandas/grid-comandas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GridComandas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cocinero$2f$comandas$2f$comanda$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cocinero/comandas/comanda-card.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
// Debemos mostrar el detalle de comanda
const comandasIniciales = [
    {
        "id_comanda": "COM-001",
        "id_mesa": {
            "id": "M1",
            "nombre": "Mesa 1",
            "capacidad": 4,
            "estado": "ocupada",
            "ubicacion": "Salón"
        },
        "hora": "14:30",
        "estado": "pendiente"
    },
    {
        "id_comanda": "COM-002",
        "id_mesa": {
            "id": "M2",
            "nombre": "Mesa 2",
            "capacidad": 2,
            "estado": "ocupada",
            "ubicacion": "Terraza"
        },
        "hora": "14:35",
        "estado": "en_cocina"
    },
    {
        "id_comanda": "COM-003",
        "id_mesa": {
            "id": "M3",
            "nombre": "Mesa 3",
            "capacidad": 6,
            "estado": "ocupada",
            "ubicacion": "VIP"
        },
        "hora": "14:15",
        "estado": "listo"
    },
    {
        "id_comanda": "COM-004",
        "id_mesa": {
            "id": "M4",
            "nombre": "Mesa 4",
            "capacidad": 4,
            "estado": "ocupada",
            "ubicacion": "Salón"
        },
        "hora": "14:40",
        "estado": "cancelado"
    }
];
function GridComandas() {
    const [comandas, setComandas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(comandasIniciales);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        children: comandas.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cocinero$2f$comandas$2f$comanda$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                comanda: c,
                onClick: ()=>2
            }, c.id_comanda, false, {
                fileName: "[project]/src/components/cocinero/comandas/grid-comandas.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/cocinero/comandas/grid-comandas.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_a4126cbb._.js.map