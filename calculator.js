let gelen_deger = '';

function ekle(deger) 
{
    const skarakter=gelen_deger[gelen_deger.length-1];
    if ((deger === '%' || deger === '^2' || deger==='.') && isNaN(skarakter)) 
    {
        return;
    }
    if(['%'].includes(skarakter))
    {
        gelen_deger=gelen_deger.slice(0,-1);
    }
    gelen_deger += deger;
    document.getElementById('ekran').value = gelen_deger;
    ekranKaydir();
}

function geriAl() 
{
    gelen_deger = gelen_deger.slice(0, -1);
    document.getElementById('ekran').value = gelen_deger;
}

function temizle() 
{
    gelen_deger = '';
    document.getElementById('ekran').value = '';
}

function islem(operator) 
{
    const skarakter=gelen_deger[gelen_deger.length-1];
    if(['+','-','*','/','%'].includes(skarakter))
    {
        gelen_deger=gelen_deger.slice(0,-1);
    }
    if(gelen_deger.length===0 || ['+','-','*','/'].includes(skarakter))
    {
        return;
    }
    gelen_deger += operator;
    document.getElementById('ekran').value = gelen_deger;
}

function gonder() 
{
    const sonuc = phesapla(gelen_deger);
    document.getElementById('ekran').value = sonuc;
    gelen_deger = sonuc.toString();     
}

function phesapla(ifade) 
{
    let sparantezA = ifade.lastIndexOf('(');
    while (sparantezA !== -1) 
    {
        let sparantezK = ifade.indexOf(')', sparantezA);
        let pifade = ifade.slice(sparantezA + 1, sparantezK);
        let psonuc = hesapla(pifade);

        ifade = ifade.slice(0, sparantezA) + psonuc + ifade.slice(sparantezK + 1);
        sparantezA = ifade.lastIndexOf('(');
    }
    return hesapla(ifade);
}

function hesapla(ifade) 
{
    const tokenler = ifade.match(/(\d+\.?\d*|\+|\-|\*|\/|%|\^2|√)/g);

    for (let i = 0; i < tokenler.length; i++) 
    {
        if (tokenler[i] === '√') 
        {
            let sayi = parseFloat(tokenler[i + 1]);
            let karekok = Math.sqrt(sayi);
            tokenler.splice(i, 2, karekok.toString());
            i--; 
        } 
        else if (tokenler[i] === '^2') 
        {
            let sayi = parseFloat(tokenler[i - 1]);
            let kare = Math.pow(sayi, 2);
            tokenler.splice(i - 1, 2, kare.toString());
            i--; 
        } 
        else if (tokenler[i] === '%') 
        {
            let yuzde = parseFloat(tokenler[i - 1]) / 100;
            tokenler.splice(i - 1, 2, yuzde.toString());
            i--;
        }
    }

    for (let i = 0; i < tokenler.length; i++) 
    {
        if (tokenler[i] === '*' || tokenler[i] === '/') 
        {
            let sonuc = (tokenler[i] === '*') ?
                parseFloat(tokenler[i - 1]) * parseFloat(tokenler[i + 1]) :
                parseFloat(tokenler[i - 1]) / parseFloat(tokenler[i + 1]);
            tokenler.splice(i - 1, 3, sonuc.toString());
            i--;
        }
    }

    let sonuc = parseFloat(tokenler[0]);
    for (let i = 1; i < tokenler.length; i += 2) 
    {
        let sonrakideger = parseFloat(tokenler[i + 1]);
        if (tokenler[i] === '+') 
        {
            sonuc += sonrakideger;
        } 
        else if (tokenler[i] === '-') 
        {
            sonuc -= sonrakideger;
        }
    }

    return sonuc;
}

function ekranKaydir() 
{
    var ekran = document.getElementById('ekran');
    ekran.scrollLeft = ekran.scrollWidth;
}

