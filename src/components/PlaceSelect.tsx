import {Select, Space, Spin} from 'antd';
import {useQuery} from "react-query";
import {fetchPlaces} from "../services/fetchService.ts";
import React from "react";

const {Option} = Select;

type PlaceSelectProps = {
    onChange: (value: string[]) => void,
}

const PlaceSelect:React.FC<PlaceSelectProps> = ({onChange}) => {
    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryFn: () => fetchPlaces(),
        queryKey: ['places', 'all']
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
            placeholder="Выберите место действия"
            onChange={handleChange}
            optionLabelProp="label"
        >
            {isSuccess && data?.map(item => <Option key={item.uuid}
                                                    value={item.uuid}
                                                    label={`${item.type} ${item.name}`}>
                <Space>
                    {`${item.type} ${item.name}`}
                </Space>
            </Option>)}
        </Select>
    );
};

export default PlaceSelect;