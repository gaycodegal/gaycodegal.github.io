var OnePage = {
  linkMenu: function (i, element) {
    if (i < OnePage.links.length) {
      $(element).click(OnePage.go.bind({
        caller: element,
        page: OnePage.links[i],
        theme: OnePage.themes[i],
        content: OnePage.content[i]
      }));
    }
  },
  links: [],
  load: function () {
    OnePage.contentDiv = $("#main-content");
    $("#link-list").children().each(OnePage.linkMenu);
    document.body.onhashchange = OnePage.hrefMutation;
    OnePage.hrefMutation();
  },
  hrefMutation: function () {
    var address = window.location.href.split("#");
    var loaded = false;
    if (address.length == 2) {
      address = "#" + address[1];
      address = OnePage.links.indexOf(address);
      if (address >= 0) {
        loaded = true;
        OnePage.follow = false;
        $("#link-list").children()[address].click();
        OnePage.follow = true;
      }
    }

    if (!loaded) {
      $("#link-list").children()[1].click();
    }
  },
  go: function () {
    $(".selected").removeClass("selected").addClass("selectable");
    $(this.caller).removeClass("selectable").addClass("selected");
    if (OnePage.follow)
      window.location.href = this.page;
    if (this.page.charAt(0) == "#") {
      $(document.body).removeClass().addClass(this.theme);
      OnePage.contentDiv.html("");
      if (this.content)
        OnePage.contentDiv.html(this.content.getContent());
    }
  },
  themes: [],
  follow: true,
  contentDiv: null
};


function DirectFill(content) {
  this.content = content;
}

DirectFill.prototype.getContent = function () {
  var div = document.createElement("div");
  div.innerHTML = this.content;
  return div;
};


function DisplaySet(content) {
  this.content = content;
}

DisplaySet.prototype.getContent = function () {
  var ul = document.createElement("ul");
  ul.className = "display-set";
  for (var i = 0; i < this.content.length; i++) {
    var obj = this.content[i];
    var li = document.createElement("li");
    if (obj.container) {
      li.appendChild(obj.container);
    } else {
      if (obj.title || obj.link) {
        var h1 = document.createElement("h1");
        if (obj.link) {
          var link = document.createElement("a");
          link.href = obj.link;
          h1.appendChild(link);
          if (obj.title) {
            link.innerHTML = obj.title;
          } else {
            link.textContent = obj.link;
          }
        } else {
          h1.innerHTML = obj.title;
        }
        li.appendChild(h1);
      }
      if (obj.about) {
        var about = obj.about;
        for (var j = 0; j < about.length; j++) {
          if (j != 0) {
            li.appendChild(document.createElement("br"));
          }
          var p = document.createElement("p");
          p.innerHTML = about[j];
          li.appendChild(p);
        }

      }
    }
    ul.appendChild(li);
  }

  return ul;
};

function LinkSet(content) {
  this.container = document.createElement("div");
  this.container.className = "link-buttons";
  this.content = content;
  this.getContent();

}

LinkSet.prototype.getContent = function () {
  this.container.innerHTML = null;
  for (var i = 0; i < this.content.length; i++) {
    var obj = this.content[i];
    var a = document.createElement("a");
    a.href = obj.href;
    a.className = "link-button";
    a.innerHTML = obj.title;
    this.container.appendChild(a);
  }
  return this.container;
};

OnePage.links = ["../", "#about", "#apps", "#lab"];
OnePage.themes = [0, "colorscheme-1", "colorscheme-2", "colorscheme-3", "colorscheme-4"];
OnePage.content = [0, new DisplaySet([

{
  title: "Greetings!",
  about: ["I'm Sarah. I occasionally make side projects or contribute to open source. Professionally I'm a Frontend Lead and I care about accessibility. One day I hope to retire and work on open source full time, maybe improve accessibility tech on Linux."]
			},

{
  title: "My Experience",
  about: ["I have worked in most of the common languages and some uncommon ones too. Currently a Frontend Lead, I've done iOS, Android, and Full Stack Web Development."]
			}, 

{
  title: "Contact",
          about: ["LinkedIn: <a href=\"https://www.linkedin.com/in/sarahoro\">https://www.linkedin.com/in/sarahoro</a>"]
		}

]), new DisplaySet([

{
  title: "My Apps",
  about: ["I used to publish apps. Now I don't. Apple doesn't make it free, so I removed my apps. Perhaps I'll write some android apps some day."]
}, 

]), new DisplaySet([

{
  title: "The Lab",
  about: ["Here are some of the cool little projects I've built ranked vaguely based on the coolness factor of each project. Essentially a curated view of my projects:"]
}, 

{
  link: "https://github.com/gaycodegal/Vaporware-1-The-Puzzle-Game",
  title: "Vaporware Puzzle Game",
  about: ["I made it over the pandemic. Love the Godot Engine. Features a settings panel with the ability to translate the app, change font size, and control volume, screen size throught the game. It's a good demonstration of a very basic but full game if you're looking for one. Very vague on instructions on how to solve each of the puzzles, so if you can't solve any of them don't worry about it."]
}, 

{
  link: "https://github.com/gaycodegal/jack-keyboard-keybind",
  title: "Jack Keyboard Keybind",
  about: ["Turns your keyboard into a midi input device with Jack, so you can pump events around to specific applications. I added the ability to remap your keyboard with CSV to the project. Still working on more advanced features, but I haven't had the time lately to commit back due to current events."]
}, 

{
  link: "https://github.com/gaycodegal/LizardUp",
  title: "Lizard Up",
  about: ["Once published as an app on iOS. Now it's a browser game. Mindless, sorta fun."]
}, 

{
  link: "https://github.com/gaycodegal/spaceship_control",
  title: "Spaceship Universal Up Godot",
  about: ["Want to make a space game in godot? Good starting point here for a ship controller. Consider making it open source yourself if you ever give up on your own game. Blockbench offers a decent model creator if you're bad at 3d modelling."]
}, 

{
  link: "https://github.com/gaycodegal/image-rotator",
  title: "Rot13 for images",
  about: ["It's not a true self reversing algorithm yes, but it has a very strong visual signature, gives you a rough idea of the colors that the original image was, while not allowing you to see the original. Super easy to reverse the transformation. Even reversable after upload and download from twitter it seems."]
}, 

{
  link: "https://github.com/gaycodegal/svg-to-ascii",
  title: "Svg to colored ascii",
  about: ["No one had done it that I could find so I thought I'd do it. I apologize for the use of bazel to compile it, it's my go to as a really hate make."]
}, 

{
  link: "https://github.com/gaycodegal/sniffle-interpreter",
  title: "Sniffle Interpreter",
  about: ["My very own interpreted language :) (interpreted via a C++ engine I wrote for it). I created the current build as an excercise in 'Can I build a cross-platform scripting language?' I really wanted to have my own language for general purpose scripting in cross platform SDL2 based applications, and this was my inital solution. I intend to take a good look into the CPython interpreter, and eventually make this just as fast and useable as Python (albeit with less modules) and move the interpreter fully into C instead of C++. It is currently slower than most modern scripting languages and is a real pain to use in practice, but I intend to fix pain points. Feature set listed in project readme. Documentation in header files."]
}, 
    
{
  link: "https://github.com/gaycodegal/perspective-game-mango/",
  title: "Perspective Game Mango",
  about: ["This project is an initial MVP build of a point and click iOS game engine. It features my LISP-like interpreted language - Sniffle and runs games through this scripting language. More details in project readme."]
}, 
    
{
  link: "https://github.com/gaycodegal/c-server-guacamole",
  title: "C Server Guacamole",
  about: ["A curses based tcp chat client & server built from scratch in C. It doesn't even use the standard string library - it has it's own. Also has its own linked list. Eventually, I intend to build more interesting features like basic encryption and file sharing."]
}, 
    
{
  link: "https://github.com/gaycodegal/image-mangler",
  title: "Image Mangler",
  about: ["A sample steganography project I built. Complete with demo if you download it."]
}, 

{
  link: "https://gaycodegal.github.io/DrawingBook/",
  title: "Drawing Book",
  about: ["A fully functional web app for drawing and note taking, I use it to detail app ideas, or code concepts, as it contains infinite pages of infinite size. It saves using my circular script object notation (CSON) binary format."]
}, 

{
  link: "http://bluecode.altervista.org/space/",
  title: "A Space Game (defunct link)",
  about: ["The code for this one is potentially lost, have to check my backup disk. A simple space game that has little point, but looks cool and is somewhat optimized behind the scenes. Later versions exist with paralax, which if I can find the source of those versions will be moved to github."]
}, 

{
  link: "https://gaycodegal.github.io/ListInput/",
  title: "List Input",
  about: ["A usefule multi-item text input that submits an Array in JSON format on form submission. I built this according to requirements I was given, and added a few features of my own design as this was allowed by the requirements. Very simple to use, and well <a href='https://gaycodegal.github.io/ListInput/documentation'>documented</a>."]
}, 

{
  link: "http://thatfishgame.altervista.org/nmssky/",
  title: "Auto-Animated Scene (defunct link)",
  about: ["I made a javascript renderer that parses and displays the .sif animated file format! It's pretty cool in my opinion :) This is the no man sky's Atlas animated as a looping display. It changes colors cyclically over a very long period of time, but it should be aparent after five minutes. More examples of this engine appear later."]
}, 

{
  link: "https://gaycodegal.github.io/QuestApp/",
  title: "Quest App",
  about: ["A little dungeon exploring 8-bit app in HTML5 that is complete, but more features should be added to make it fun. Uses A* pathing if you click/tap away from your character!"]
}, 

{
  link: "http://bluecode.altervista.org/JsQuest/regex.html",
  title: "Regex Functional Replacement (defunct link)",
  about: ["I use this every once and a while, it's a tool I made that allows regular patterns to be replaced with the output of a javascript function. Very useful to me."]
}, 

{
  link: "http://thatfishgame.altervista.org/",
  title: "That Fish Game (defunct link)",
  about: ["A silly little game I threw together to showcase my sif animation engine. Catch ten fish and build a fish gun."]
}, 

{
  link: "http://thatfishgame.altervista.org/lmaotank/",
  title: "The LMAO Tank (defunct link)",
  about: ["It's the sif engine again, but this time with an animated lmaotank - animated text!"]
}, 

{
  link: "https://github.com/gaycodegal/ProjectCupcake",
  title: "Project Cupcake [source]",
  about: ["Built by my three collegues and I. It uses a custom event system, and will use a grid-like layout and a custom animation format. It also uses CSON. See <a href=\"#apps\">my apps</a> for a better description."]
}, 

{
  link: "https://github.com/gaycodegal",
  title: "And More! (Including Source Code)",
  about: ["My Github page. You can find the source for the Drawing Book and Lizard Up (and sifs) there as well as a few other things that didn't make it here."]
}

]), 0];

window.onload = OnePage.load;
