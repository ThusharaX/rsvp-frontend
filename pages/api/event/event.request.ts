import { apiInstance } from '../apiInstance'
import { CreateEventData, EventData } from './event.interface'

export async function addEvent(requestData: CreateEventData): Promise<boolean> {
  try {
    const response = await apiInstance.post(`/event`, requestData)

    return response.data
  } catch (e) {
    console.error(e.message)
    return false
  }
}

export async function getEvents(): Promise<EventData[] | boolean> {
  try {
    const response = await apiInstance.get('/events')

    return response.data as EventData[]
  } catch (e) {
    console.error(e.message)
    return false
  }
}

export async function getEvent({
  queryKey,
}: any): Promise<EventData | boolean> {
  const [_key, { eventId }] = queryKey
  console.log(_key)
  try {
    const response = await apiInstance.get(`/events/${eventId}`)
    return response.data as EventData
  } catch (e) {
    console.error(e.message)
    return false
  }
}

export async function updateEvent(
  eventId: string,
  eventData: EventData
): Promise<boolean> {
  try {
    const response = await apiInstance.put(`/event/${eventId}`, eventData)

    return response.data
  } catch (e) {
    console.error(e.message)
    return false
  }
}
