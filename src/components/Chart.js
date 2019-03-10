
import React from 'react';
import {
PieChart, Pie, Legend, Cell, ResponsiveContainer
} from 'recharts';

const Chart = (props) => {
    const data = [
    { name: 'Dislike', value: props.dislikeCount },
    { name: 'Like', value: props.likeCount },
    { name: 'Neutral', value: props.neutralCount },
    ];
    
    const COLORS = ['rgb(120,147,247)', 'rgb(87,5,197)', 'rgb(54, 53, 55)'];
    
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };

        return (
        <React.Fragment>
            <ResponsiveContainer width="100%" height={450}>
                <PieChart width="100%" height={400}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    {/* <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" /> */}
                </PieChart>
            </ResponsiveContainer>
        </React.Fragment>
        );
    }


export default Chart;