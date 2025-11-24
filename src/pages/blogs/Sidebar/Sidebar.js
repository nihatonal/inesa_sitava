// Sidebar/Sidebar.jsx
import SearchBox from "./SearchBox";
import Categories from "./Categories";
import Destinations from "./Destinations";
import PopularList from "./PopularList";
import LatestList from "./LatestList";

export default function Sidebar(props) {
    return (
        <aside className="space-y-6">
            <SearchBox {...props} className={"hidden md:block"}/>
            <Categories {...props} className={"hidden md:block"}/>
            <Destinations {...props} className={"hidden md:block"}/>
            <PopularList popular={props.popular} />
            <LatestList latest={props.latest} />
        </aside>
    );
}
