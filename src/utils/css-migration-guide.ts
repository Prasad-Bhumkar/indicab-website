/**
 * CSS to Tailwind Migration Guide
 *
 * This file contains mappings and examples for migrating legacy CSS to Tailwind CSS utility classes.
 * It's intended as a reference for the migration process.
 */

const _containerMappings = {
    container: "container mx-auto px-4 md:px-5",
    flexRow: "flex",
    flexColumn: "flex flex-col",
    gridThreeColumns: "grid grid-cols-1 md:grid-cols-3 gap-5",
}

const _colorMappings = {
    primaryGreen: {
        css: "#0d785c",
        tailwind: "bg-primary text-white",
    },
    secondaryOrange: {
        css: "#ff6b00",
        tailwind: "bg-secondary text-white",
    },
    textDark: {
        css: "#333",
        tailwind: "text-gray-800 dark:text-gray-200",
    },
    textMedium: {
        css: "#666",
        tailwind: "text-gray-600 dark:text-gray-400",
    },
    textLight: {
        css: "#999",
        tailwind: "text-gray-500 dark:text-gray-500",
    },
}

const _buttonMappings = {
    primaryButton: "bg-primary text-white px-5 py-2.5 rounded font-medium hover:bg-primary/90 transition-colors",
    secondaryButton: "bg-secondary text-white px-5 py-2.5 rounded font-medium hover:bg-secondary/90 transition-colors",
    outlineButton: "border border-primary text-primary px-5 py-2.5 rounded font-medium hover:bg-primary/10 transition-colors",
}

const _typographyMappings = {
    h1: "text-3xl md:text-4xl font-bold mb-4",
    h2: "text-2xl md:text-3xl font-bold mb-3",
    h3: "text-xl md:text-2xl font-semibold mb-2",
    h4: "text-lg md:text-xl font-semibold mb-2",
    bodyText: "text-base text-gray-600 dark:text-gray-400",
    smallText: "text-sm text-gray-500 dark:text-gray-500",
    link: "text-primary hover:underline",
}

const _spacingMappings = {
    small: "m-2 p-2",
    medium: "m-4 p-4",
    large: "m-6 p-6",
    horizontalSmall: "mx-2 px-2",
    horizontalMedium: "mx-4 px-4",
    horizontalLarge: "mx-6 px-6",
    verticalSmall: "my-2 py-2",
    verticalMedium: "my-4 py-4",
    verticalLarge: "my-6 py-6",
}

const _formMappings = {
    input: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
    select: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none bg-white",
    textarea: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[100px]",
    formGroup: "mb-4",
    formLabel: "block text-gray-700 dark:text-gray-300 font-medium mb-2",
}

const _cardMappings = {
    card: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",
    cardWithHover: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow",
    featureCard: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-primary",
}

const _responsivePatterns = {
    hideOnMobile: "hidden md:block",
    showOnMobile: "block md:hidden",
    responsiveGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    responsiveText: "text-base md:text-lg lg:text-xl",
    responsivePadding: "p-4 md:p-6 lg:p-8",
}

const _darkModeExamples = {
    adaptiveText: "text-gray-800 dark:text-gray-200",
    adaptiveBackground: "bg-white dark:bg-gray-800",
    adaptiveBorder: "border-gray-200 dark:border-gray-700",
    adaptiveCard: "bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/30 text-gray-800 dark:text-gray-200",
}

const _migrationExamples = {
    _containerMappings,
    _colorMappings,
    _buttonMappings,
    _typographyMappings,
    _spacingMappings,
    _formMappings,
    _cardMappings,
    _responsivePatterns,
    _darkModeExamples,
}

export default _migrationExamples;
