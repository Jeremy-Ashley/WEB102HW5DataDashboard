import Charts from "./Charts";

function ChartsPage({ items }) {
    return (
        <div className="chartsPage"> 
            <h1> Recipe Charts </h1>
            <Charts items={items} />
        </div>
    );
}

export default ChartsPage;