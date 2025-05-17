// If you have access to ButtonProps type, import it here at the top level
import type { ButtonProps } from '../../components/ui/button/button';
import { Route } from './routes';

declare module '@components/ui/button' {
    export const Button: React.ForwardRefExoticComponent<
        ButtonProps & React.RefAttributes<HTMLButtonElement>
    >;
}

declare module '@/components/MapView' {
    export interface MapViewProps {
        routes: Route[];
        onRouteSelect: (routeId: number) => void;
    }

    const _MapView: React.FC<MapViewProps>;
    export default _MapView;
}
