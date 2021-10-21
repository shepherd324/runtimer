import './Race.css';
import Runner from './Runner';
import {
  Link,
  useParams
} from "react-router-dom";

function Race(props) {

  let { id } = useParams();
  
  const runners = props.runners.map(runner => (
    <div>{runner.name}</div>
  ))
  
  return (
    <div className="runner">
      {runners}       
    </div>
    
  );
}

export default Race;
