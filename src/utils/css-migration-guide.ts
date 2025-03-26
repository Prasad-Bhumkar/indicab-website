/**
 * CSS to Tailwind Migration Guide
 *
 * This file contains mappings and examples for migrating legacy CSS to Tailwind CSS utility classes.
 * It's intended as a reference for the migration process.
 *
 * Common CSS-to-Tailwind mappings:
 */

/**
 * Container and Layout Mappings
 */
const containerMappings = {
  // CSS: .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  // Tailwind: className="container mx-auto px-4 md:px-5"
  container: "container mx-auto px-4 md:px-5",

  // CSS: .flex-row { display: flex; }
  // Tailwind: className="flex"
  flexRow: "flex",

  // CSS: .flex-col { display: flex; flex-direction: column; }
  // Tailwind: className="flex flex-col"
  flexColumn: "flex flex-col",

  // CSS: .grid-layout { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  // Tailwind: className="grid grid-cols-1 md:grid-cols-3 gap-5"
  gridThreeColumns: "grid grid-cols-1 md:grid-cols-3 gap-5",
}

/**
 * Color Mappings
 *
 * Legacy IndiCab CSS colors to Tailwind equivalent
 */
const colorMappings = {
  // Primary Green
  primaryGreen: {
    css: "#0d785c",
    tailwind: "bg-primary text-white", // Assuming 'primary' is configured in tailwind.config.js
  },

  // Secondary Orange/Amber
  secondaryOrange: {
    css: "#ff6b00",
    tailwind: "bg-secondary text-white", // Assuming 'secondary' is configured in tailwind.config.js
  },

  // Text colors
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

/**
 * Button Mappings
 */
const buttonMappings = {
  // Primary Button
  // CSS: .btn-primary { background-color: #0d785c; color: white; padding: 10px 20px; border-radius: 5px; }
  primaryButton: "bg-primary text-white px-5 py-2.5 rounded font-medium hover:bg-primary/90 transition-colors",

  // Secondary Button
  // CSS: .btn-secondary { background-color: #ff6b00; color: white; padding: 10px 20px; border-radius: 5px; }
  secondaryButton: "bg-secondary text-white px-5 py-2.5 rounded font-medium hover:bg-secondary/90 transition-colors",

  // Outline Button
  // CSS: .btn-outline { color: #0d785c; border: 1px solid #0d785c; padding: 10px 20px; border-radius: 5px; }
  outlineButton: "border border-primary text-primary px-5 py-2.5 rounded font-medium hover:bg-primary/10 transition-colors",
}

/**
 * Typography Mappings
 */
const typographyMappings = {
  // Headings
  h1: "text-3xl md:text-4xl font-bold mb-4",
  h2: "text-2xl md:text-3xl font-bold mb-3",
  h3: "text-xl md:text-2xl font-semibold mb-2",
  h4: "text-lg md:text-xl font-semibold mb-2",

  // Paragraphs
  bodyText: "text-base text-gray-600 dark:text-gray-400",
  smallText: "text-sm text-gray-500 dark:text-gray-500",

  // Links
  link: "text-primary hover:underline",
}

/**
 * Spacing and Margin/Padding Mappings
 */
const spacingMappings = {
  // Small spacing
  small: "m-2 p-2", // margin and padding of 0.5rem (8px)

  // Medium spacing
  medium: "m-4 p-4", // margin and padding of 1rem (16px)

  // Large spacing
  large: "m-6 p-6", // margin and padding of 1.5rem (24px)

  // X-axis spacing (horizontal)
  horizontalSmall: "mx-2 px-2",
  horizontalMedium: "mx-4 px-4",
  horizontalLarge: "mx-6 px-6",

  // Y-axis spacing (vertical)
  verticalSmall: "my-2 py-2",
  verticalMedium: "my-4 py-4",
  verticalLarge: "my-6 py-6",
}

/**
 * Form Element Mappings
 */
const formMappings = {
  // Input fields
  // CSS: .input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
  input: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",

  // Select dropdown
  select: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none bg-white",

  // Textarea
  textarea: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[100px]",

  // Form group/row
  formGroup: "mb-4",
  formLabel: "block text-gray-700 dark:text-gray-300 font-medium mb-2",
}

/**
 * Card and Container Mappings
 */
const cardMappings = {
  // Basic card
  // CSS: .card { background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); padding: 20px; }
  card: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",

  // Card with hover effect
  cardWithHover: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow",

  // Feature card
  featureCard: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-primary",
}

/**
 * Responsive Design Patterns
 */
const responsivePatterns = {
  // Hide on mobile, show on desktop
  hideOnMobile: "hidden md:block",

  // Show on mobile, hide on desktop
  showOnMobile: "block md:hidden",

  // Responsive grid that goes from 1 column on mobile to 3 columns on desktop
  responsiveGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

  // Responsive text sizes
  responsiveText: "text-base md:text-lg lg:text-xl",

  // Responsive padding
  responsivePadding: "p-4 md:p-6 lg:p-8",
}

/**
 * Dark Mode Support
 *
 * Tailwind makes it easy to support dark mode with the 'dark:' variant
 */
const darkModeExamples = {
  // Text color that changes in dark mode
  adaptiveText: "text-gray-800 dark:text-gray-200",

  // Background color that changes in dark mode
  adaptiveBackground: "bg-white dark:bg-gray-800",

  // Border color that changes in dark mode
  adaptiveBorder: "border-gray-200 dark:border-gray-700",

  // Card that changes in dark mode
  adaptiveCard: "bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/30 text-gray-800 dark:text-gray-200",
}

/**
 * Example of migrating a specific component's CSS to Tailwind
 *
 * Before:
 * ```css
 * .contact-header {
 *   background-color: #0d785c;
 *   color: white;
 *   padding: 50px 0 30px;
 *   margin-bottom: 40px;
 *   text-align: center;
 * }
 *
 * .contact-header h1 {
 *   margin: 0;
 *   font-size: 2.2rem;
 *   font-weight: 600;
 * }
 *
 * .contact-header p {
 *   margin-top: 10px;
 *   opacity: 0.9;
 *   font-size: 1.1rem;
 *   max-width: 600px;
 *   margin-left: auto;
 *   margin-right: auto;
 * }
 * ```
 *
 * After:
 * ```jsx
 * <div className="bg-primary text-white py-12 pb-8 mb-10 text-center">
 *   <h1 className="text-3xl md:text-4xl font-semibold m-0">Contact Us</h1>
 *   <p className="mt-2.5 opacity-90 text-lg max-w-[600px] mx-auto">
 *     We're here to help! Reach out to us with any questions or feedback.
 *   </p>
 * </div>
 * ```
 */

/**
 * Examples of common pattern migrations
 */
/**
 * Updated CSS to Tailwind Migration Guide
 *
 * This file contains mappings and examples for migrating legacy CSS to Tailwind CSS utility classes.
 * It's intended as a reference for the migration process.
 *
 * Common CSS-to-Tailwind mappings:
 */
const containerMappings = {
  container: "container mx-auto px-4 md:px-5",
  flexRow: "flex",
  flexColumn: "flex flex-col",
  gridThreeColumns: "grid grid-cols-1 md:grid-cols-3 gap-5",
}

/**
 * Color Mappings
 *
 * Legacy IndiCab CSS colors to Tailwind equivalent
 */
const colorMappings = {
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

/**
 * Button Mappings
 */
const buttonMappings = {
  primaryButton: "bg-primary text-white px-5 py-2.5 rounded font-medium hover:bg-primary/90 transition-colors",
  secondaryButton: "bg-secondary text-white px-5 py-2.5 rounded font-medium hover:bg-secondary/90 transition-colors",
  outlineButton: "border border-primary text-primary px-5 py-2.5 rounded font-medium hover:bg-primary/10 transition-colors",
}

/**
 * Typography Mappings
 */
const typographyMappings = {
  h1: "text-3xl md:text-4xl font-bold mb-4",
  h2: "text-2xl md:text-3xl font-bold mb-3",
  h3: "text-xl md:text-2xl font-semibold mb-2",
  h4: "text-lg md:text-xl font-semibold mb-2",
  bodyText: "text-base text-gray-600 dark:text-gray-400",
  smallText: "text-sm text-gray-500 dark:text-gray-500",
  link: "text-primary hover:underline",
}

/**
 * Spacing and Margin/Padding Mappings
 */
const spacingMappings = {
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

/**
 * Form Element Mappings
 */
const formMappings = {
  input: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
  select: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none bg-white",
  textarea: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[100px]",
  formGroup: "mb-4",
  formLabel: "block text-gray-700 dark:text-gray-300 font-medium mb-2",
}

/**
 * Card and Container Mappings
 */
const cardMappings = {
  card: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",
  cardWithHover: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow",
  featureCard: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-primary",
}

/**
 * Responsive Design Patterns
 */
const responsivePatterns = {
  hideOnMobile: "hidden md:block",
  showOnMobile: "block md:hidden",
  responsiveGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  responsiveText: "text-base md:text-lg lg:text-xl",
  responsivePadding: "p-4 md:p-6 lg:p-8",
}

/**
 * Dark Mode Support
 */
const darkModeExamples = {
  adaptiveText: "text-gray-800 dark:text-gray-200",
  adaptiveBackground: "bg-white dark:bg-gray-800",
  adaptiveBorder: "border-gray-200 dark:border-gray-700",
  adaptiveCard: "bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/30 text-gray-800 dark:text-gray-200",
}

/**
 * Example of migrating a specific component's CSS to Tailwind
 */
const migrationExamples = {
  containerMappings,
  colorMappings,
  buttonMappings,
  typographyMappings,
  spacingMappings,
  formMappings,
  cardMappings,
  responsivePatterns,
  darkModeExamples,
}

export default migrationExamples;
  containerMappings,
  colorMappings,
  buttonMappings,
  typographyMappings,
  spacingMappings,
  formMappings,
  cardMappings,
  responsivePatterns,
  darkModeExamples,
}

export default migrationExamples;
