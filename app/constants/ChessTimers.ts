import { RadioOption } from "../components/RadioButton";

const chessTimers: RadioOption[] = [
    {
        label: '1 Minuto',
        value: '60'
    },
    {
        label: '1 Minuto + 1 segundo',
        value: '60+1'
    },
    {
        label: '2 Minutos + 1 segundo',
        value: '120+1'
    },
    {
        label: '3 Minutos',
        value: '180'
    },
    {
        label: '3 Minutos + 2 segundos',
        value: '180+2'
    },
    {
        label: '5 Minutos',
        value: '300'
    },
    {
        label: '5 Minutos + 5 segundos',
        value: '300+5'
    },
    {
        label: '10 Minutos',
        value: '600'
    },
    {
        label: '10 Minutos + 5 segundos',
        value: '600+5'
    },
    {
        label: '15 Minutos + 10 segundos',
        value: '900+10'
    },
    {
        label: '30 minutos',
        value: '1800'
    },
    {
        label: '60 minutos',
        value: '3600'
    }
];

export default chessTimers;