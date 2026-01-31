async function loadSite(){
  try{
    const res = await fetch("data/site.json");
    const data = await res.json();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if(el && value !== undefined && value !== null){
        el.textContent = value;
      }
    };

    setText("schoolName", data.schoolName);
    setText("tagline", data.tagline);
    setText("yearFounded", data.yearFounded);
    setText("phone", data.phone ? `📞 ${data.phone}` : "");
    setText("email", data.email ? `✉️ ${data.email}` : "");
    setText("address", data.address ? `📍 ${data.address}` : "");
    setText("hours", data.hours ? `🕒 ${data.hours}` : "");

    // Director / stats (si existen)
    if(data.director){
      setText("directorName", data.director.name);
      setText("directorEmail", data.director.email);
      setText("directorPhone", data.director.phone);
    }
    if(data.stats){
      setText("studentsCount", data.stats.students);
      setText("teachersCount", data.stats.teachers);
    }
    if(data.education){
      setText("methodology", data.education.methodology);
    }

    // Mapa (si existe un iframe src)
    const map = document.getElementById("mapFrame");
    if(map && data.mapIframeSrc){
      map.src = data.mapIframeSrc;
    }

    // Facebook (si existe)
    if(data.facebook){
      const fb = document.getElementById("facebookName");
      if(fb) fb.textContent = data.facebook;
    }

  }catch(e){
    console.warn("No se pudo cargar site.json", e);
  }
}

document.addEventListener("DOMContentLoaded", loadSite);
