import { Card } from 'antd';

interface IProps {
  name: string;
  description: string;
}

const TaskCard = ({ name, description }: IProps) => {
  return (
    <Card title={name} variant='borderless'>
      {description}
    </Card>
  );
};

export default TaskCard;
