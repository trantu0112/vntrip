import { DOMESTIC_AIRPORT, domesticAirport } from '../constants/combo'

export const getNamePointFromCode = (code: string) => {
    const airPort = DOMESTIC_AIRPORT.filter((air: any) => air?.code === code)
    return airPort?.[0]?.province_name || ''
}

export const getCodeFromProvinceId = (id: number) => {
    const airPort = domesticAirport.filter((air: any) => air?.province_id === id)
    return airPort?.[0]?.code || ''
}
