
import { type } from '@testing-library/user-event/dist/type';
import './styles.css';

type Props = {
    label: string;
    value: string;
}

export const InfoItem = ({label, value}:Props) => {
 return(
    <div className='Container2'>
        <div className='Label'>{label}</div>
        <div className='Value'>{value}</div>
    </div>
);
}