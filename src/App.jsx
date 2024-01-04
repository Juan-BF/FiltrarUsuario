import { useEffect, useState } from 'react'
import './App.css'

const Principal = () => {


  const [filtro, setFiltro] = useState([]);
  const [busca, setBusca] = useState("");
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

  
  const [valorInput, setValorInput] = useState('');

 

  const agregar = () => {
    const nuevoUser = { first: valorInput, thumbnail: '/nuevo.png' };
    const nuevoFiltro = [...filtro, nuevoUser];
    setInformacion(nuevoFiltro);
    setValorInput('');
  }

  const eliminar = (index) => {
    const elim = filtro.filter((_, indez) => indez !== index)
    setInformacion(elim)
  }


  useEffect(() => {
    const filtro = informacion.filter((inf) => inf.first.toLowerCase().startsWith(busca.toLowerCase()));
    setFiltro(filtro)
  }, [busca,informacion]);


  const nombreNuevo = (e) => {
    setValorInput(e.target.value);
    
  };
  




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
              <input type="text" id='agregarUsuario' placeholder="Agregar Usuario"
                onChange={nombreNuevo} value={valorInput} />
              <button onClick={agregar} className='agregar btn'>Agregar</button>
            </div>
          </div>
          <ul className='lista'>
            {filtro.map((result, index) => (
              <li key={index} className='listli' id={`${index}`} >
                <div className='listUsuarios'>
                  <img src={result.thumbnail} alt="Imagen usuario" />
                  <h3 className='nombreUs'>
                    {result.first}
                  </h3>
                  <button onClick={() => eliminar(index)}>Eliminar</button>
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
