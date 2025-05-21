import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";


const data = [
  { evento: 'Camaleão', lucro: 15000 },
  { evento: 'Quinta', lucro: 52000 },
  { evento: 'Vumbora', lucro: 42000 },
  { evento: 'Pool Party', lucro: 20000 },
  { evento: 'Halloween', lucro: 25000 },
  { evento: 'Natal', lucro: 27000 },
  { evento: 'Réveillon', lucro: 30000 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1', '#FF6F91'];

export default function Dashboard()
{
        const [filtro, setFiltro] = useState('');
    const dataFiltrada = filtro
    ? data.filter(item => item.evento.toLowerCase().includes(filtro.toLowerCase()))
    : data;
    
    return(
        <div className="dashboard-container">
                <h1>Dashboard</h1>
                <div className="filtro-container">
                    <input
                    type="text"
                    placeholder="Filtrar por evento"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
            <div className="graficos">
                    <div className="grafico-card">
                    <h3>Lucro por Evento</h3>
                    <LineChart width={400} height={300} data={dataFiltrada}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="evento" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="lucro" stroke="#8884d8" />
                    </LineChart>
                    </div>

                    <div className="grafico-card">
                    <h3>Distribuição de Lucro</h3>
                    <PieChart width={400} height={300}>
                        <Pie
                        data={dataFiltrada}
                        dataKey="lucro"
                        nameKey="evento"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                        >
                        {dataFiltrada.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    </div>

                    <div className="grafico-card">
                    <h3>Comparativo de Lucros</h3>
                    <BarChart width={400} height={300} data={dataFiltrada}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="evento" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="lucro" fill="#00C49F" />
                    </BarChart>
                    </div>
                </div>
                        </div>
    )
}