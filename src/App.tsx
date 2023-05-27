import PersonSelect from "./components/PersonSelect.tsx";
import PlaceSelect from "./components/PlaceSelect.tsx";
import WeatherSelect from "./components/WeatherSelect.tsx";
import ItemSelect from "./components/ItemSelect.tsx";
import {Button} from "antd";
import NewsComponent from "./components/NewsComponent.tsx";
import {useMutation} from "react-query";
import {createNews} from "./services/fetchService.ts";
import {INewsCreate} from "./types/INewsCreate.ts";
import React from "react";
import {INews} from "./types/INews.ts";

function App() {
    const [startedNews, setStartedNews] = React.useState<INewsCreate>({
        persons: [],
        places: [],
        items: [],
        weathers: []
    });
    const [finishedNews, setFinishedNews] = React.useState<INews | null>(null);

    const {mutate: createNewsMutation, isLoading} = useMutation({
        mutationFn: () => {
            setFinishedNews(null);
            return createNews(startedNews);
        },
        onSuccess: (news) => {
            setFinishedNews(news);
        },
        onError: error => {
            alert((error as Error).message);
        }
    });

    return (
        <>
            <div>
                <h3 style={{padding: 0}}>Участники:</h3>
                <PersonSelect onChange={(uuids) => {
                    setStartedNews(prev => {
                        return {
                            ...prev,
                            persons: uuids
                        }
                    })
                }}/>
            </div>
            <div>
                <h3 style={{padding: 0}}>Места:</h3>
                <PlaceSelect onChange={(uuids) => {
                    setStartedNews(prev => {
                        return {
                            ...prev,
                            places: uuids
                        }
                    })
                }}/>
            </div>
            <div>
                <h3 style={{padding: 0}}>Погода:</h3>
                <WeatherSelect onChange={(uuids) => {
                    setStartedNews(prev => {
                        return {
                            ...prev,
                            weathers: uuids
                        }
                    })
                }}/>
            </div>
            <div>
                <h3 style={{padding: 0}}>Предметы:</h3>
                <ItemSelect onChange={(uuids) => {
                    setStartedNews(prev => {
                        return {
                            ...prev,
                            items: uuids
                        }
                    })
                }}/>
            </div>
            <div style={{padding: "20px 0", width: "100%"}}>
                <Button
                    type="primary"
                    style={{width: '100%'}}
                    loading={isLoading}
                    onClick={() => createNewsMutation()}
                >
                    Найти новость
                </Button>
            </div>
            {finishedNews && <NewsComponent news={finishedNews}
                                            onClick={() => {
                                                setFinishedNews(null);
                                            }}
            />}
        </>
    )
}

export default App
