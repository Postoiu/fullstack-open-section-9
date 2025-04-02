import { CoursePart } from '../App';

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case 'basic':
      return (
        <div>
          <h4>
            {props.part.name} {props.part.exerciseCount}
          </h4>
          <em>{props.part.description}</em>
        </div>
      );
    case 'group':
      return (
        <div>
          <h4>
            {props.part.name} {props.part.exerciseCount}
          </h4>
          <p>project exercises {props.part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h4>
            {props.part.name} {props.part.exerciseCount}
          </h4>
          <em>{props.part.description}</em>
          <p>{props.part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h4>
            {props.part.name} {props.part.exerciseCount}
          </h4>
          <em>{props.part.description}</em>
          <p>required skills: {props.part.requirements.join(', ')}</p>
        </div>
      );
  }
};

export default Part;
