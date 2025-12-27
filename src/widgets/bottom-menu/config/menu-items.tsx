import {
    BookOpenIcon,
    HomeIcon,
    MapIcon,
    NumberedListIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/16/solid';
import { RoutePath } from '@shared/config';
import { Shield } from 'lucide-react';

export const menuItems = [
    { path: RoutePath.STORY, icon: BookOpenIcon },
    { path: RoutePath.CHARACTER, icon: UserIcon },
    { path: RoutePath.FRACTION, icon: Shield },
    { path: RoutePath.RULES, icon: NumberedListIcon },
    { path: RoutePath.MAP, icon: MapIcon },
];

export const adminMenuItems = [
    { path: RoutePath.ADMIN_HOME, icon: HomeIcon },
    { path: RoutePath.ADMIN_PLAYERS, icon: UserGroupIcon },
    { path: RoutePath.ADMIN_FACTIONS, icon: Shield },
];
