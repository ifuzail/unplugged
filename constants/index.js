import {SiGooglehome} from 'react-icons/si'
import {FaUsers} from 'react-icons/fa'
import {MdExplore, MdFavorite} from 'react-icons/md'
import {HiMenuAlt4} from 'react-icons/hi'
import {BsPlusCircleFill} from 'react-icons/bs'
const NavIcons = {
    HomeIcon: <SiGooglehome fontSize={20}/>,
    FolksIcon: <FaUsers fontSize={20}/>,
    ExploreIcon: <MdExplore fontSize={20}/>,
    SavesIcon: <MdFavorite fontSize={20} />,
    MenuIcon: <HiMenuAlt4 fontSize={20}/>,
    CreateIcon: <BsPlusCircleFill fontSize={20}/>
}

export const navlinks = [
    {
        id: 1,
        Title: 'Home',
        image: NavIcons.HomeIcon,
        Url: '/'
    },
    {
        id: 2,
        Title: 'Folks',
        image: NavIcons.FolksIcon,
        Url: '/folks'
    },
    {
        id: 3,
        Title: 'Explore',
        image: NavIcons.ExploreIcon,
        Url: '/explore'
    },
    {
        id: 4,
        Title: 'Create',
        image: NavIcons.CreateIcon,
        Url: '/create-post'
    },
    {
        id: 6,
        Title: 'More',
        image: NavIcons.MenuIcon,
        Url: null
    },
];

export const bottomLinks = [
    {
        id: 1,
        image: NavIcons.HomeIcon,
        Url: '/'
    },
    {
        id: 2,
        image: NavIcons.FolksIcon,
        Url: '/folks'
    },
    {
        id: 3,
        image: NavIcons.ExploreIcon,
        Url: '/explore'
    },
    {
        id: 5,
        image: NavIcons.CreateIcon,
        Url: '/create-post'
    },
]

