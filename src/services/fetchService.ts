import {IItem} from "../types/IItem.ts";
import {IPerson} from "../types/IPerson.ts";
import {IPlace} from "../types/IPlace.ts";
import {IWeather} from "../types/IWeather.ts";
import {INewsCreate} from "../types/INewsCreate.ts";
import {INews} from "../types/INews.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const BASE = import.meta.env.VITE_BASE_URL

export async function fetchItems(): Promise<IItem[]> {
    const res = await fetch(`${BASE}/items/`)

    if (!res.ok) throw new Error('Failed to fetch items!')

    return res.json()
}

export async function fetchPersons(): Promise<IPerson[]> {
    const res = await fetch(`${BASE}/persons/`)

    if (!res.ok) throw new Error('Failed to fetch persons!')

    const rawData = await res.json();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return rawData.map<IPerson>(d => {
        return {
            uuid: d.uuid,
            firstName: d.first_name,
            lastName: d.last_name,
            age: d.age,
            work: d.work
        }
    })
}

export async function fetchPlaces(): Promise<IPlace[]> {
    const res = await fetch(`${BASE}/places/`)

    if (!res.ok) throw new Error('Failed to fetch places!')

    return res.json()
}

export async function fetchWeathers(): Promise<IWeather[]> {
    const res = await fetch(`${BASE}/weathers/`)

    if (!res.ok) throw new Error('Failed to fetch weathers!')

    return res.json()
}

export async function createNews(news: INewsCreate): Promise<INews> {
    if (news.persons.length == 0) {
        throw new Error('Укажите участников!');
    }
    if (news.items.length == 0) {
        throw new Error('Укажите предметы!');
    }
    if (news.places.length == 0) {
        throw new Error('Укажите места!');
    }
    if (news.weathers.length == 0) {
        throw new Error('Укажите погоду!');
    }

    const res = await fetch(`${BASE}/news/`, {
        method: 'POST',
        body: JSON.stringify(news),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!res.ok) throw new Error('Failed to create news!')

    return res.json()
}

export async function deleteNews(uuid: string): Promise<any> {
    const res = await fetch(`${BASE}/news/${uuid}`, {
        method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete news!')
}