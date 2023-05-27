import {Button, Form, Input} from 'antd';
import {INews} from "../types/INews.ts";
import React from "react";
import {useMutation} from "react-query";
import {deleteNews} from "../services/fetchService.ts";

const {TextArea} = Input;

type NewsComponentProps = {
    news: INews,
    onClick: (uuid: string) => void,
}

const NewsComponent: React.FC<NewsComponentProps> = ({news, onClick}) => {
    const {mutate} = useMutation({
        mutationFn: (uuid: string) => {
            return deleteNews(uuid);
        },
        onError: error => {
            alert((error as Error).message);
        }
    });

    return (
        <Form name="form_item_path" layout="vertical">
            <Form.Item
                name="content"
            >
                <TextArea rows={10}
                          style={{color: 'black', opacity: '1'}}
                          value={news.content}
                          content={news.content}
                          placeholder={news.content}
                          disabled/>
            </Form.Item>
            <Button type="primary"
                    onClick={() => {
                        mutate(news.uuid);
                        onClick(news.uuid)
                    }}
                    danger
                    style={{width: '100%'}}>
                Удалить новость
            </Button>
        </Form>
    );
};

export default NewsComponent;