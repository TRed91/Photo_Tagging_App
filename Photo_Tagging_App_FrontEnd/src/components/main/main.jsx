import ImageComponent from "./imageComponent";
import Sidebar from "./sidebar";

function MainComponent() {
    return (
        <main>
            <div><ImageComponent/></div>
            <div><Sidebar /></div>
        </main>
    )
}

export default MainComponent;