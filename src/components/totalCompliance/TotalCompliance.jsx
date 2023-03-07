import LiquidChart from './liquid-chart'
import './totalCompliance.css';

const TotalCompliance = () => {
  //container with title for the liquid gauge
  return (
    <div className="liquid-chart-container">
      <h4 className='component-title'>Total Compliance</h4>
      <div>
        <LiquidChart score={0.7}/>
      </div>      
    </div>
  )
}

export default TotalCompliance