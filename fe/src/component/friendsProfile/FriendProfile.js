import React from "react";
import "./friendsprofile.scss";

const dummy = [
  {
    name: "testassasdasdasdasdssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
  {
    name: "testassssd",
    img:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_klook_water/activities/t9ur9cc1khkup1dmcbzd/C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.webp",
  },
];

function FriendProfile() {
  const newDummy = dummy.filter((item, index) => {
    return index < 9;
  });
  return (
    <div className="friendprofile">
      <h1>Bạn bè</h1>
      <div className="friendprofile-container">
        {newDummy.map((item, i) => {
          return (
            <div key={i} className="friendprofile-item">
              <img src={item.img} alt="" />
              <p>
                {item.name.length > 15
                  ? item.name.substring(0, 15) + "..."
                  : item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendProfile;
