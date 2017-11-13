import React from 'react';
import { LineChart, Line } from 'recharts';
import Chart from './Chart';

class LineChartComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log('props', nextProps, this.props, nextProps === this.props);
    return nextProps !== this.props;
  }
  render() {
    return (
      <Chart data={this.props.data} ChartType={LineChart} ChartFill={Line} />
    );
  }
}

export default LineChartComponent;
