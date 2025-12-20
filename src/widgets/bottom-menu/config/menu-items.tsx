import {
    BookOpenIcon,
    MapIcon,
    NumberedListIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/16/solid';
import { RoutePath } from '@shared/config';

export const menuItems = [
    { path: RoutePath.STORY, icon: BookOpenIcon },
    { path: RoutePath.CHARACTER, icon: UserIcon },
    { path: RoutePath.FRACTION, icon: UserGroupIcon },
    { path: RoutePath.RULES, icon: NumberedListIcon },
    { path: RoutePath.MAP, icon: MapIcon },
];
