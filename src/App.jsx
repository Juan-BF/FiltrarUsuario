import { useEffect, useState } from 'react'
import './App.css'

const Principal = () => {

  async function apiUserRamdom() {
    const solicitud = await fetch('https://randomuser.me/api/?results=5')
    const respuesta = await solicitud.json()
    return respuesta
  }


  const [informacion, setInformacion] = useState([


  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {

        const informacion = await apiUserRamdom();
        const users = informacion.results;

        if (users) {
          const informacionUsuarios = [];

          users.forEach((objeto) => {
            const {
              name: { first, last },
              picture: { thumbnail },
              dob: { age, date },
              location: { city },
              email,
              cell,
            } = objeto;

            informacionUsuarios.push({
              first,
              last,
              thumbnail,
              age,
              date,
              city,
              email,
              cell,
            });
          });

          setInformacion(informacionUsuarios);
          console.log(informacionUsuarios);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchData();

  }, []);

  console.log(informacion)

  return (
    <>
      <section className='box'>
        <div className='conten'>
          <h1 className='titulo'>Buscar Usuario</h1>
          <div className='inputEstilo'>
            <div>
              <input type="text" id='buscarUsuario' placeholder="Buscar Usuario" />
              <input type="text" id='agregarUsuario' placeholder="Agregar Usuario" />
              <button className='agregar btn'>Agregar</button>
            </div>
          </div>
          <ul className='lista'>
            {informacion.map((result, index) => (
              <li key={index}>
                <div className='listUsuarios'>
                  <img src={result.thumbnail} alt="Imagen usuario" />
                  <h3>
                    {result.first}
                  </h3>
                  <button>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Principal
