import { useEffect, useState } from 'react'
import './App.css'

const Principal = () => {


  const [busca, setBusca] = useState("")
  const [informacion, setInformacion] = useState([]);


  useEffect(() => {

    async function apiUserRamdom() {
      const solicitud = await fetch('https://randomuser.me/api/?results=5')
      const respuesta = await solicitud.json()
      return respuesta
    }

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

        }

      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchData();
  }, []);


  const handleInputChange = (e) => {
    const nuevoValor = (e.target.value);
    setBusca(nuevoValor);
  };

// defino una constante- agarro el objeto y le meto el filter-  tengo que definir donde voy a tomar la informacion en este caso es en inf.first
// luego el doy startsWitch ( aqui pondre que buscare )
  const filtro = informacion.filter((inf) => inf.first.toLowerCase().startsWith(busca.toLowerCase()));

// console.log(filtro)

  return (
    <>
      <section className='box'>
        <div className='conten'>
          <h1 className='titulo'>Buscar Usuario</h1>
          <div className='inputEstilo'>
            <div>
              <input type="text" id='buscarUsuario' placeholder="Buscar Usuario"
                onChange={handleInputChange} 
                />
              <input type="text" id='agregarUsuario' placeholder="Agregar Usuario" />
              <button className='agregar btn'>Agregar</button>
            </div>
          </div>
          <ul className='lista'>
            {filtro.map((result, index) => (
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
