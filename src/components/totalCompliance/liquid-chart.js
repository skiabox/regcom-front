import ReactEcharts from "echarts-for-react";
import "echarts-liquidfill";

function LiquidChart(props) {
  const score = props.score; // score to be given as prop
  const phasevar = Math.PI / 4 // phase of wave, in radian system
  const option = {
    series: [
      {
        type: "liquidFill",
        name: 'Score',
        center: ['50%', '35%'],
        radius: '68%',
        amplitude: '5%',
        waveLength: '100%', 
        phase: phasevar,
        data: [score, score-0.03, score-0.06], // 3 waves at different heights
        /* { value: score-0.03, direction: 'left' } for different direction of wave*/
        period: function (value, index) { // milliseconds that it takes to move forward a wave-length
          // This function is called three times, each for a data item in series.
          //`index` is 0, 1, 2.
          return 6000 - 2000*index; //back to front wave: 6s, 4s, 2s 
        },
        silent: true,
        color: ['rgba(114, 87, 152, 0.1)', 'rgba(82, 47, 145, 0.3)', 'rgba(82, 47, 145, 0.85)'],
        backgroundStyle: {
          borderWidth: 2,
          borderColor: '#725798',
          color: 'white'
        },
        itemStyle: {
          shadowBlur: 0
        },
        outline: { show: false },
        label: {
          formatter: function(param) {
            return param.seriesName + '\n'
                + (param.value*100) + '%';
          },
          fontSize: '1.5rem',
          fontWeight: 400,
          color: '#725798'
        }
      }
    ]
  }

  return <ReactEcharts option={option} />;
}

export default LiquidChart;