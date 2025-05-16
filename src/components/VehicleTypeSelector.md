# VehicleTypeSelector Component

A form component that allows users to select a vehicle type from predefined options using radio buttons with rich visual presentation.

## Features

- Integrates with React Hook Form for form state management
- Displays vehicle type options in a responsive grid layout
- Supports error states with visual feedback
- Can be disabled when needed
- Fully accessible with proper ARIA attributes
- Dynamic pricing display
- Real-time availability check
- Vehicle comparison tooltips
- Image lazy loading
- Animated transitions
- Dark mode support

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | string | Yes | Field name for the form control |
| control | Control<any> | Yes | React Hook Form control object |
| error | FieldError | No | Error object from form validation |
| disabled | boolean | No | Whether the selector is disabled |
| bookingType | 'hourly' \| 'tour' \| 'corporate' | No | Type of booking to filter vehicles |
| showPricing | boolean | No | Whether to display pricing information |
| onVehicleHover | (vehicle: VehicleType) => void | No | Callback when hovering over a vehicle |
| packageId | string | No | ID of selected package for tour bookings |

## Usage

```tsx
import { useForm } from 'react-hook-form';
import VehicleTypeSelector from './VehicleTypeSelector';

function BookingForm() {
  const { control, watch } = useForm({
    defaultValues: {
      vehicleType: '',
      bookingType: 'hourly',
      packageId: '',
    },
  });

  const bookingType = watch('bookingType');
  const packageId = watch('packageId');

  return (
    <form>
      <VehicleTypeSelector
        name="vehicleType"
        control={control}
        error={errors.vehicleType}
        bookingType={bookingType}
        showPricing={true}
        packageId={packageId}
        onVehicleHover={(vehicle) => {
          console.log('Vehicle details:', vehicle);
        }}
      />
    </form>
  );
}
```

## Vehicle Types

The component dynamically loads vehicle types based on the booking type:

### Hourly Rental
- Sedan (Swift Dzire, Honda City)
- SUV (Innova, XUV500)
- Luxury (Mercedes, BMW)
- Tempo Traveller

### Tour Packages
- Standard Sedan
- Premium SUV
- Luxury Vehicle
- Group Transport

### Corporate
- Employee Transport
- Executive Cars
- Event Transport
- Fleet Solutions

Each vehicle type includes:
- High-quality image
- Vehicle specifications
- Passenger capacity
- Luggage capacity
- Pricing details
- Available features
- Real-time availability

## Styling

The component uses Tailwind CSS classes for styling:
- Radio buttons are wrapped in clickable cards
- Error states are indicated with red borders
- Disabled state has a gray background
- Responsive grid layout with 2-4 columns
- Hover effects with smooth transitions
- Image placeholders while loading
- Price tag animations
- Feature icons with tooltips
- Comparison overlay
- Dark mode variants

## Accessibility

- Uses semantic HTML with proper label associations
- Radio buttons are keyboard navigable
- Error messages are properly associated with the form control
- Visual feedback for error and disabled states
- ARIA labels for pricing information
- Role attributes for interactive elements
- Focus management with visible indicators
- Screen reader announcements for state changes
- Support for reduced motion preferences
- High contrast mode compatibility
- Touch target sizing for mobile
- Keyboard shortcuts for quick selection

## Test Coverage

### Unit Tests
- Component rendering (100%)
- Props validation (100%)
- Event handling (100%)
- State management (100%)
- Error scenarios (100%)

### Integration Tests
- Form integration (100%)
- Pricing updates (95%)
- Image loading (90%)
- Accessibility compliance (100%)

### E2E Tests
- User interactions
- Keyboard navigation
- Screen reader compatibility
- Mobile responsiveness

## Error Handling

When validation fails, the component:
1. Displays a red border around the options
2. Shows the error message below the options
3. Maintains functionality while displaying the error state
4. Provides clear instructions for correction
5. Announces errors to screen readers
6. Maintains focus for keyboard users
7. Logs validation failures for monitoring

## Performance Optimization

- Lazy loading of vehicle images
- Memoized price calculations
- Debounced availability checks
- Optimized re-renders
- Preloaded critical assets
- Compressed image assets
- Cached vehicle data
- Code splitting for features

## Best Practices

1. Always provide meaningful error messages
2. Use disabled state sparingly
3. Ensure field name matches form schema
4. Handle form submission in parent
5. Implement proper error boundaries
6. Follow accessibility guidelines
7. Cache API responses
8. Optimize image loading
9. Handle edge cases gracefully
10. Maintain consistent styling

## Related Components

- BookingForm
- PaymentForm
- VehicleCard
- BookingProgress
- PriceCalculator
- VehicleComparison
- FeaturesList
- AvailabilityIndicator
- ImageGallery
- SpecificationTable 