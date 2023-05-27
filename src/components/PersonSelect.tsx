import {Select, Space, Spin} from 'antd';
import {useQuery} from "react-query";
import {fetchPersons} from "../services/fetchService.ts";
import React from "react";

const {Option} = Select;

type PersonSelectProps = {
    onChange: (value: string[]) => void,
}

const PersonSelect: React.FC<PersonSelectProps> = ({onChange}) => {
    const {data, isSuccess, isError, error, isLoading} = useQuery({
        queryFn: () => fetchPersons(),
        queryKey: ['persons', 'all']
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
            placeholder="Выберите участников"
            onChange={handleChange}
            optionLabelProp="label"
        >
            {isSuccess && data?.map(item => <Option key={item.uuid}
                                                    value={item.uuid}
                                                    label={`${item.lastName} ${item.firstName}, ${item.age} лет, ${item.work}`}>
                <Space>
                    {`${item.lastName} ${item.firstName}, ${item.age} лет, ${item.work}`}
                </Space>
            </Option>)}
        </Select>
    );
};

export default PersonSelect;