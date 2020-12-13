import { root } from './createHeader'
import rsSchoolLogo from '../img/rs_school_js.svg'

export default function createFooter() {
    const linkEnkoff = 'https://github.com/Enkoff';
    const linkPokhylko = 'https://github.com/pokhylko';
    const linkIra = 'https://github.com/iralitv'
    const footerLinkRs = 'https://rs.school';
    const footerHtmlTemplate = `
    <footer class="footer">
        <div class="link-wrapper">
            <a class="footer__link" href="${linkIra}" target="_blank">mentor: Litvinchuk</a>
            <a class="footer__link" href="${linkEnkoff}" target="_blank">student: Yenko</a>
            <a class="footer__link" href="${linkPokhylko}" target="_blank">student: Pokhylko</a>
        </div>    
        <div class="logo-wrapper">
            <h3 class="logo__date">2020 ©</h3>
            <img class="logo__img" src="${rsSchoolLogo}" alt="logo-rs">
        </div>
            <a class="footer__link link__rs" href="${footerLinkRs}" target="_blank">Rs School</a>
    </footer>
    `
    root.insertAdjacentHTML('beforeend', footerHtmlTemplate);
}