export interface Props {
    id: number;
    name: string;
    poster_path: string,    
    type: string
  }

export interface movieProps {
    id: number;
    title: string,
    poster_path: string,   
}

export interface basicData{
  itemId: string,
  type: string
}

export interface videoProps {
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: boolean,
  id: string
}