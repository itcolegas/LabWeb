//React
import React from 'react';

//Styles
import './home.css';

function Home(){
    return(
        <div className='home'>
            <div className='bg-img bg1'>
                <div className='welcome'>
                    <div className='welcome-text'>
                        <h1 className='title_1'>SOLUCIONES</h1>
                        <h1 className='title_2'>LOGÍSTICAS</h1>
                        <p>Creamos soluciones y servicios logísticos personalizados para nuestros clientes implementando herramientas tecnológicas innovadoras.</p>
                    </div>
                </div>
            </div>
            <div className='bg-solid bg2'>
                <div className='white-back'>
                    <div className='three-blocks'>
                        <div className='left-block'>
                            <div className='left-text'>
                                <h1>¿QUIÉNES SOMOS?</h1>
                            </div>
                        </div>
                        <div className='vl'/>
                        <div className='right-block'>
                            <div className='right-text'>
                                <p>Somos una empresa 100% mexicana con más de 10 años de experiencia en el sector logístico. Ofreciendo soluciones de acuerdo a las necesidades de nuestros clientes en materia de distribución, almacenaje y consultoría.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-img bg3'>
                <div className='company-mision'>
                    <div className='side-column'>
                        <div className='column-container'>
                            <h1>MISIÓN</h1>
                            <br/>
                            <p>Generar Soluciones Logísticas flexibles de acuerdo a las demandas de mercado y las necesidades de nuestros clientes</p>
                        </div>    
                    </div>
                    <div className='center-column'>
                        <div className='column-container'>
                            <h1>VISIÓN</h1>
                            <br/>
                            <p>Ser punta de lanza en innovación y desarrollo en el sector logístico</p>
                        </div>
                    </div>
                    <div className='side-column'>
                        <div className='column-container'>
                            <h1>VALORES</h1>
                            <br/>
                            <ul>
                                <li>Confianza</li>
                                <li>Calidad</li>
                                <li>Adaptabilidad</li>
                                <li>Honestidad</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-solid bg4'>
                <div className='white-back'>
                    
                </div>
            </div>
            <div className='bg-logo bg5'>
                <div className='blue-back'>
                    <div className=''>
                        
                    </div>
                </div>
            </div>
            <div className='bg-img bg6'>
                <div className='white-back'>
                    <div className=''>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;