import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PM10SpecificIndex, PM25SpecificIndex, SO2SpecificIndex, NO2SpecificIndex, O3SpecificIndex } from '../Constants';

class InfoComponent extends Component {

    render() {
        return (
            <div className="info">
                <h1>Poluanți atmosferici</h1>
                <p></p>
                <div className="accordion-info-menu">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="">Dioxid de azot (NO2)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div className="accordion-details">
                                    <h1 className="info-section">1.Generalități</h1>
                                    <p className="info-paragraph">Oxizii de azot sunt un grup de gaze foarte reactive, care conțin azot și oxigen în cantităţi variabile. Majoritatea oxizilor de azot sunt gaze fără culoare sau miros.</p>
                                    <h1 className="info-section">2.Efecte asupra sănătății publice</h1>
                                    <p className="info-paragraph">Dioxidul de azot este cunoscut ca fiind un gaz foarte toxic atât pentru oameni cât și pentru animale (gradul de toxicitate al dioxidului de azot este de 4 ori mai mare decât cel al monoxidului de azot). Expunerea la concentrații ridicate poate fi fatală, iar la concentrații reduse afectează țesutul pulmonar.</p>
                                    <p className="info-paragraph">Populația expusă la acest tip de poluanți poate avea dificultăți respiratorii, iritații ale căilor respiratorii, disfuncții ale plămânilor. Expunerea pe termen lung la o concentrație redusă poate distruge țesuturile pulmonare ducând la emfizem pulmonar.</p>
                                    <p className="info-paragraph">Persoanele cele mai afectate de expunerea la acest poluant sunt copiii.</p>
                                    <h1 className="info-section">3.Indice specific</h1>
                                    <p className="info-paragraph">Indicele specific corespunzător dioxidului de sulf se stabilește prin încadrarea valorii medii orare a concentrațiilor în unul dintre domeniile de concentrații înscrise în tabelul următor:</p>
                                    <table className="table table-striped table-bordered">
                                        <tbody>
                                            <tr className="info-table-row">
                                                <td className="info-table-value">Domeniu de concentrații pentru dioxid de azot (µg/m3)</td>
                                                <td className="info-table-index">Indice specific</td>
                                            </tr>
                                            <tr>
                                                <td>{NO2SpecificIndex[0].minValue}-{NO2SpecificIndex[0].maxValue}</td>
                                                <td className="info-table-index" style={{ backgroundColor: NO2SpecificIndex[0].color, color: "black" }}>{NO2SpecificIndex[0].specificIndex}</td>
                                            </tr>
                                            <tr>
                                                <td>{NO2SpecificIndex[1].minValue}-{NO2SpecificIndex[1].maxValue}</td>
                                                <td className="info-table-index" style={{ backgroundColor: NO2SpecificIndex[1].color, color: "black" }}>{NO2SpecificIndex[1].specificIndex}</td>
                                            </tr>
                                            <tr>
                                                <td>{NO2SpecificIndex[2].minValue}-{NO2SpecificIndex[2].maxValue}</td>
                                                <td className="info-table-index" style={{ backgroundColor: NO2SpecificIndex[2].color, color: "black" }}>{NO2SpecificIndex[2].specificIndex}</td>
                                            </tr>
                                            <tr>
                                                <td>{NO2SpecificIndex[3].minValue}-{NO2SpecificIndex[3].maxValue}</td>
                                                <td className="info-table-index" style={{ backgroundColor: NO2SpecificIndex[3].color, color: "white" }}>{NO2SpecificIndex[3].specificIndex}</td>
                                            </tr>
                                            <tr>
                                                <td>{NO2SpecificIndex[4].minValue}-{NO2SpecificIndex[4].maxValue}</td>
                                                <td className="info-table-index" style={{ backgroundColor: NO2SpecificIndex[4].color, color: "white" }}>{NO2SpecificIndex[4].specificIndex}</td>
                                            </tr>
                                            <tr>
                                                <td>{NO2SpecificIndex[5].minValue}-{NO2SpecificIndex[5].maxValue}</td>
                                                <td className="info-table-index" style={{ backgroundColor: NO2SpecificIndex[5].color, color: "white" }}>{NO2SpecificIndex[5].specificIndex}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className="">Dioxid de sulf (SO2)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <h1 className="info-section">1.Generalități</h1>
                                <p className="info-paragraph">Dioxidul de sulf este un gaz incolor, amărui, neinflamabil, cu un miros pătrunzător care irită ochii și căile respiratorii.</p>
                                <h1 className="info-section">2.Efecte asupra sănătății publice</h1>
                                <p className="info-paragraph">În funcție de concentrație și perioada de expunere dioxidul de sulf are diferite efecte asupra sănătăţii umane.
                                Expunerea la o concentrație mare de dioxid de sulf, pe o perioadă scurtă de timp, poate provocă dificultăți respiratorii severe. Sunt afectate în special persoanele cu astm, copiii, vârstnicii și persoanele cu boli cronice ale căilor respiratorii.
                                Expunerea la o concentrație redusă de dioxid de sulf, pe termen lung poate avea ca efect infecții ale tractului respirator.
Dioxidul de sulf poate potența efectele periculoase ale ozonului.</p>
                                <h1 className="info-section">3.Indice specific</h1>
                                <p className="info-paragraph">Indicele specific corespunzător dioxidului de sulf se stabilește prin încadrarea valorii medii orare a concentrațiilor în unul dintre domeniile de concentrații înscrise în tabelul următor:</p>
                                <table className="table table-striped table-bordered">
                                    <tbody>
                                        <tr className="info-table-row">
                                            <td className="info-table-value">Domeniu de concentrații pentru dioxid de sulf (µg/m3)</td>
                                            <td className="info-table-index">Indice specific</td>
                                        </tr>
                                        <tr>
                                            <td>{SO2SpecificIndex[0].minValue}-{SO2SpecificIndex[0].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: SO2SpecificIndex[0].color, color: "black" }}>{SO2SpecificIndex[0].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{SO2SpecificIndex[1].minValue}-{SO2SpecificIndex[1].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: SO2SpecificIndex[1].color, color: "black" }}>{SO2SpecificIndex[1].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{SO2SpecificIndex[2].minValue}-{SO2SpecificIndex[2].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: SO2SpecificIndex[2].color, color: "black" }}>{SO2SpecificIndex[2].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{SO2SpecificIndex[3].minValue}-{SO2SpecificIndex[3].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: SO2SpecificIndex[3].color, color: "white" }}>{SO2SpecificIndex[3].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{SO2SpecificIndex[4].minValue}-{SO2SpecificIndex[4].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: SO2SpecificIndex[4].color, color: "white" }}>{SO2SpecificIndex[4].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{SO2SpecificIndex[5].minValue}-{SO2SpecificIndex[5].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: SO2SpecificIndex[5].color, color: "white" }}>{SO2SpecificIndex[5].specificIndex}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className="">Ozon (O3)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <h1 className="info-section">1.Generalități</h1>
                                <p className="info-paragraph">Gaz foarte oxidant, foarte reactiv, cu miros înecăcios. Se concentrează în stratosferă și asigură protecția împotriva radiației UV dăunătoare vieții. Ozonul prezent la nivelul solului se comportă ca o componentă a"smogului fotochimic". Se formează prin intermediul unei reacții care implică în particular oxizi de azot și compuși organici volatili.</p>
                                <h1 className="info-section">2.Efecte asupra sănătății publice</h1>
                                <p className="info-paragraph">Concentrația de ozon la nivelul solului provoacă iritarea traiectului respirator și iritarea ochilor. Concentrații mari de ozon pot provoca reducerea funcției respiratorii.</p>
                                <h1 className="info-section">3.Indice specific</h1>
                                <p className="info-paragraph">Indicele specific corespunzător ozonului se stabilește prin încadrarea valorii medii orare a concentrațiilor în unul dintre domeniile de concentrații înscrise în tabelul următor:</p>
                                <table className="table table-striped table-bordered">
                                    <tbody>
                                        <tr className="info-table-row">
                                            <td className="info-table-value">Domeniu de concentrații pentru ozon (µg/m3)</td>
                                            <td className="info-table-index">Indice specific</td>
                                        </tr>
                                        <tr>
                                            <td>{O3SpecificIndex[0].minValue}-{O3SpecificIndex[0].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: O3SpecificIndex[0].color, color: "black" }}>{O3SpecificIndex[0].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{O3SpecificIndex[1].minValue}-{O3SpecificIndex[1].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: O3SpecificIndex[1].color, color: "black" }}>{O3SpecificIndex[1].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{O3SpecificIndex[2].minValue}-{O3SpecificIndex[2].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: O3SpecificIndex[2].color, color: "black" }}>{O3SpecificIndex[2].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{O3SpecificIndex[3].minValue}-{O3SpecificIndex[3].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: O3SpecificIndex[3].color, color: "white" }}>{O3SpecificIndex[3].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{O3SpecificIndex[4].minValue}-{O3SpecificIndex[4].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: O3SpecificIndex[4].color, color: "white" }}>{O3SpecificIndex[4].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{O3SpecificIndex[5].minValue}-{O3SpecificIndex[5].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: O3SpecificIndex[5].color, color: "white" }}>{O3SpecificIndex[5].specificIndex}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className="">Particule în suspensie PM2.5 și PM10</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <h1 className="info-section">1.Generalități</h1>
                                <p className="info-paragraph">Particulele în suspensie reprezintă un amestec complex de particule foarte mici și picături de lichid.</p>
                                <h1 className="info-section">2.Efecte asupra sănătății publice</h1>
                                <p className="info-paragraph">Dimensiunea particulelor este direct legată de potențialul de a cauza efecte. O problemă importantă o reprezintă particulele cu diametrul aerodinamic mai mic de 10 micrometri, care trec prin nas și gât şi pătrund în alveolele pulmonare provocând inflamații și intoxicări.</p>
                                <p className="info-paragraph">Sunt afectate în special persoanele cu boli cardiovasculare și respiratorii, copiii, vârstnicii şi astmaticii.
                                Copiii cu vârsta mai mică de 15 ani inhalează mai mult aer, și în consecință mai mulți poluanți. Ei respiră mai repede decât adulții și tind să respire mai mult pe gură, ocolind practic filtrul natural din nas. Sunt în mod special vulnerabili, deoarece plămânii lor nu sunt dezvoltați, iar țesutul pulmonar care se dezvoltă în copilărie este mai sensibil.
                                Poluarea cu pulberi înrăutăţeşte simptomele astmului, respectiv tuse, dureri în piept și dificultăți respiratorii.
Expunerea pe termen lung la o concentrație scăzută de pulberi poate cauza cancer și moartea prematură.</p>
                                <h1 className="info-section">3.Indice specific PM25</h1>
                                <p className="info-paragraph">Indicele specific corespunzător particulelor în suspensie &lt; 2.5 µm se stabilește prin încadrarea mediei aritmetice a valorilor orare, înregistrate în ultimele 24 de ore, în unul dintre domeniile de concentrații înscrise în tabelul următor:</p>
                                <table className="table table-striped table-bordered">
                                    <tbody>
                                        <tr className="info-table-row">
                                            <td className="info-table-value">Domeniu de concentrații pentru particule in suspensie PM2.5(µg/m3)</td>
                                            <td className="info-table-index">Indice specific</td>
                                        </tr>
                                        <tr>
                                            <td>{PM25SpecificIndex[0].minValue}-{PM25SpecificIndex[0].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM25SpecificIndex[0].color, color: "black" }}>{PM25SpecificIndex[0].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM25SpecificIndex[1].minValue}-{PM25SpecificIndex[1].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM25SpecificIndex[1].color, color: "black" }}>{PM25SpecificIndex[1].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM25SpecificIndex[2].minValue}-{PM25SpecificIndex[2].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM25SpecificIndex[2].color, color: "black" }}>{PM25SpecificIndex[2].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM25SpecificIndex[3].minValue}-{PM25SpecificIndex[3].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM25SpecificIndex[3].color, color: "white" }}>{PM25SpecificIndex[3].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM25SpecificIndex[4].minValue}-{PM25SpecificIndex[4].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM25SpecificIndex[4].color, color: "white" }}>{PM25SpecificIndex[4].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM25SpecificIndex[5].minValue}-{PM25SpecificIndex[5].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM25SpecificIndex[5].color, color: "white" }}>{PM25SpecificIndex[5].specificIndex}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p></p>
                                <h1 className="info-section">4.Indice specific PM10</h1>
                                <p className="info-paragraph">Indicele specific corespunzător particulelor în suspensie &lt; 10 µm se stabilește prin încadrarea mediei aritmetice a valorilor orare, înregistrate în ultimele 24 de ore, în unul dintre domeniile de concentrații înscrise în tabelul următor:</p>
                                <table className="table table-striped table-bordered">
                                    <tbody>
                                        <tr className="info-table-row">
                                            <td className="info-table-value">Domeniu de concentrații pentru particule in suspensie PM10(µg/m3)</td>
                                            <td className="info-table-index">Indice specific</td>
                                        </tr>
                                        <tr>
                                            <td>{PM10SpecificIndex[0].minValue}-{PM10SpecificIndex[0].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM10SpecificIndex[0].color, color: "black" }}>{PM10SpecificIndex[0].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM10SpecificIndex[1].minValue}-{PM10SpecificIndex[1].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM10SpecificIndex[1].color, color: "black" }}>{PM10SpecificIndex[1].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM10SpecificIndex[2].minValue}-{PM10SpecificIndex[2].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM10SpecificIndex[2].color, color: "black" }}>{PM10SpecificIndex[2].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM10SpecificIndex[3].minValue}-{PM10SpecificIndex[3].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM10SpecificIndex[3].color, color: "white" }}>{PM10SpecificIndex[3].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM10SpecificIndex[4].minValue}-{PM10SpecificIndex[4].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM10SpecificIndex[4].color, color: "white" }}>{PM10SpecificIndex[4].specificIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>{PM10SpecificIndex[5].minValue}-{PM10SpecificIndex[5].maxValue}</td>
                                            <td className="info-table-index" style={{ backgroundColor: PM10SpecificIndex[5].color, color: "white" }}>{PM10SpecificIndex[5].specificIndex}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className="">Particule în suspensie (PM10)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>

                            </Typography>
                        </AccordionDetails>
                    </Accordion> */}
                </div>
            </div>
        )
    }
}
export default InfoComponent;