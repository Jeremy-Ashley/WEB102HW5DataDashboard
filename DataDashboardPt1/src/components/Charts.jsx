import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

function Charts({ items }) {
    const priceData = items.map((item) => ({
        name: item.title, 
        price: Number((item.pricePerServing / 100).toFixed(2))
    }));
    const nonVegetarianCount = items.filter(
        (item) => !item.vegetarian).length;
    
    const vegetarianCount = items.filter(
        (item) => item.vegetarian
    ).length;
    
        const dietData = [
            {
                name: "vegetarian",
                value: vegetarianCount
            },
            {
                name: "Non-Vegetarian",
                value: nonVegetarianCount
            }
        ];

        const COLORS = ["#4caf50","#ff9800"];

        return ( 
            <div className="chartContainer">
                <h2> Recipe Prices </h2>

                <BarChart  
                    width = {600}
                    height = {300}
                    data = {priceData}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis /> 
                    <Tooltip />

                    <Bar 
                        dataKey="price"
                        fill="#8884d8"
                    />
                </BarChart>

                <h2> vegetarian meals </h2>

                <PieChart 
                    width = {400}
                    height = {300}
                >
                    <Pie
                        data = {dietData}
                        dataKey = "value"
                        nameKey = "name"
                        outerRadius = {100}
                    >
                        {dietData.map((entry, index) => (
                            <Cell 
                                key = {`cell-${index}`}
                                fill = {COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        )
}

export default Charts;