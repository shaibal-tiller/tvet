import chattogram from '../Assets/images/chattogram.jpg'
import dhaka from '../Assets/images/dhaka.jpg'
import khulna from '../Assets/images/khulna.jpg'
import natore from '../Assets/images/natore.jpg'
import barisal from '../Assets/images/barisal.jpg'
import sylhet from '../Assets/images/sylhet.jpg'




export const LIST_CITY = [
  { id: 1, name: 'khulna', img: dhaka, areas: ['Area 1', 'Area 2', 'Area 3', 'Area 4'] },
  { id: 2, name: 'satkhira', img: khulna, areas: ['Area 1', 'Area 2', 'Area 3', 'Area 4'] },
  { id: 3, name: 'barisal', img: barisal, areas: ['Area 1', 'Area 2', 'Area 3', 'Area 4'] },
  { id: 4, name: 'rajshahi', img: natore, areas: ['Area 1', 'Area 2', 'Area 3', 'Area 4'] },
  { id: 5, name: 'sirajganj', img: sylhet, areas: ['Area 1', 'Area 2', 'Area 3', 'Area 4'] },
];


export const LIST_SURVEYOR = [
  { id: 1, name: 'John Doe', position: 'Surveyor' },
  { id: 2, name: 'Jane Smith', position: 'Assistant Surveyor' },
  { id: 3, name: 'Mike Johnson', position: 'Coordinator' },
  { id: 4, name: 'Emily Davis', position: 'Surveyor' },
  { id: 5, name: 'Daniel Wilson', position: 'Assistant Surveyor' },
  { id: 6, name: 'Olivia Thompson', position: 'Coordinator' },
  { id: 7, name: 'Jacob Martinez', position: 'Surveyor' },
  { id: 8, name: 'Sophia Anderson', position: 'Assistant Surveyor' },
  { id: 9, name: 'Michael Brown', position: 'Coordinator' },
  { id: 10, name: 'Emma Harris', position: 'Surveyor' },
];



export const SURVEY_STATUS = [
  {
    cityId: 1,
    name: 'khulna',
    total: {
      'Area 1': 400,
      'Area 2': 600,
      'Area 3': 300,
      'Area 4': 200,
    },
    completed: {
      'Area 1': 200,
      'Area 2': 400,
      'Area 3': 150,
      'Area 4': 50,
    },
  },
  {
    cityId: 2,
    name: 'satkhira',
    total: {
      'Area 1': 500,
      'Area 2': 700,
      'Area 3': 400,
      'Area 4': 200,
    },
    completed: {
      'Area 1': 300,
      'Area 2': 500,
      'Area 3': 200,
      'Area 4': 100,
    },
  },
  {
    cityId: 3,
    name: 'barisal',
    total: {
      'Area 1': 300,
      'Area 2': 500,
      'Area 3': 200,
      'Area 4': 200,
    },
    completed: {
      'Area 1': 100,
      'Area 2': 300,
      'Area 3': 100,
      'Area 4': 50,
    },
  },
  {
    cityId: 4,
    name: 'rajshahi',
    total: {
      'Area 1': 600,
      'Area 2': 800,
      'Area 3': 400,
      'Area 4': 200,
    },
    completed: {
      'Area 1': 400,
      'Area 2': 600,
      'Area 3': 200,
      'Area 4': 100,
    },
  },
  {
    cityId: 5,
    name: 'sirajganj',
    total: {
      'Area 1': 450,
      'Area 2': 650,
      'Area 3': 350,
      'Area 4': 250,
    },
    completed: {
      'Area 1': 250,
      'Area 2': 450,
      'Area 3': 150,
      'Area 4': 100,
    },
  },
];

export const USER =[{ id: 1, role: 'admin', user: 'admin', password: '1234' },...LIST_SURVEYOR.map((surveyor, index) => ({
  id: surveyor.id,
  role: 'user',
  user: `user${surveyor.id}`,
  password: '1234',
  city: LIST_CITY[index % LIST_CITY.length].name,
})),];

