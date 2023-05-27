import {Select, Space, Spin} from 'antd';
import {useQuery} from "react-query";
import {fetchWeathers} from "../services/fetchService.ts";
import React from "react";

const {Option} = Select;

type WeatherSelectProps = {
    onChange: (value: string[]) => void,
}

const WeatherSelect: React.FC<WeatherSelectProps> = ({onChange}) => {
    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryFn: () => fetchWeathers(),
        queryKey: ['weathers', 'all']
    })

    const handleChange = (value: string[]) => {
        onChange(value);
    };

    if (isLoading) {
        return <Spin/>
    }

    if (isError) {
        return <p>{(error as Error).message}</p>
    }

    return (
        <Select
            mode="multiple"
            style={{width: '100%'}}
            placeholder="Выберите погоду"
            onChange={handleChange}
            optionLabelProp="label"
        >
            {isSuccess && data?.map(item => <Option key={item.uuid}
                                                    value={item.uuid}
                                                    label={`${item.type}`}>
                <Space>
                    {`${item.type}`}
                </Space>
            </Option>)}
        </Select>
    );
};

export default WeatherSelect;