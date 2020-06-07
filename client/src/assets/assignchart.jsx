import Chart from "chart.js";
import React from "react";

// LineChart
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map((d) => d.time);
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "line",
      options: {
        maintainAspectRatio: false,
      },

      data: {
        labels: this.props.data.map((d) => d.label),
        datasets: [
          {
            label: this.props.title,
            data: this.props.data.map((d) => d.value),
            fill: "none",
            backgroundColor: this.props.color,
            pointRadius: 2,
            borderColor: this.props.color,
            borderWidth: 1,
            lineTension: 0,
          },
        ],
      },
    });
  }

  render() {
    return <canvas ref={this.canvasRef} height={500} />;
  }
}

export default LineChart;
