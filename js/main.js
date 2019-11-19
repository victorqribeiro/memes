window.onload = function(){
/*
let subs = [
	"funny",
	"dankmemes",
	"videos",
	"gifs"
];
*/
let subs = [
	"dankmemes",
	"funny"
];

let state = {
	page: 25,
	baseUrl: "https://www.reddit.com/r/"+subs.join('+')+".json",
	currentUrl: "https://www.reddit.com/r/"+subs.join('+')+".json",
	afterUrl: "",
	beforeUrl: "",
	scroll: 0
}

getLink(state.currentUrl);

function getLink(l){
	fetch(l).
	then( r => r.json() ).
	then( d => getData(d) ).
	catch( e => console.error('Error: '+e.message) );
}

function createPost(p){
	if( p.distinguished == "moderator" )
		return
	p.url = p.url.replace(/\&amp;/g,'&').replace(/\&quest;/g,'?');
	p.thumbnail = p.thumbnail.replace(/\&amp;/g,'&').replace(/\&quest;/g,'?');
	if( p.thumbnail.search(/\.jpg/i) != -1 
	 || p.thumbnail.search(/\.png/i) != -1 
	 || p.thumbnail.search(/\.gif/i) != -1 ){
		try{
			let main = document.getElementById('main');
			let post = document.createElement('div');
			post.id = p.id;
			post.className = 'post';
			let title = document.createElement('div');
			title.id = 'title';
			title.innerText = p.title.replace(/\&amp;/g,'&').replace(/\&quest;/g,'?');;
		
			let content = document.createElement('div');
			content.id = 'content';
		
			let whatslink = document.createElement('a');
			whatslink.classList.add('whastlink');
			whatslink.title = whatslink.alt = "Mandar via Whatsapp";
		
			let whatsapp = document.createElement('div');
			whatsapp.classList.add('whatsapp');
			
			let facelink = document.createElement('a');
			facelink.classList.add('facelink');
			facelink.target = "_tab";
			facelink.title = whatslink.alt = "Mandar via Facebook";
		
			let facebook = document.createElement('div');
			facebook.classList.add('facebook');
		
			if( p.url.search('.gifv') != -1 ){
			
				let url = p.url.replace('.gifv','.mp4');
				let video = document.createElement('video');
				let source = document.createElement('source');
				let videoclass = document.createElement('div');
				videoclass.classList.add('video');
				videoclass.title = "Video";
				source.src = url;
				whatslink.href = "whatsapp://send?text="+url;
				facelink.href = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(url)+"&t=victorribeiro.com/memes";
				source.type = "video/mp4";
				video.preload="auto";
				video.loop = true;
				video.appendChild( source );
				
				content.addEventListener("click", e => play(content));
				content.appendChild( video );
				content.appendChild( videoclass );
			
			}else if( p.url.search(/\.webm/i) != -1 ){
		
				let video = document.createElement('video');
				let source = document.createElement('source');
				let videoclass = document.createElement('div');
				videoclass.classList.add('video');
				videoclass.title = "Video";
				source.src = p.url;
				whatslink.href = "whatsapp://send?text="+p.url;
				facelink.href = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(p.url)+"&t=victorribeiro.com/memes";
				source.type = "video/webm";
				video.preload="auto";
				video.loop = true;
				video.appendChild( source );
				
				content.addEventListener("click", e => play(content));
				content.appendChild( video );
				content.appendChild( videoclass );
			
			}else if(p.url.search(/\.jpg/i) != -1 || p.url.search(/\.png/i) != -1 || p.url.search(/\.gif/i) != -1) {
		
				let img = new Image();
				img.src = p.url;
				whatslink.href = "whatsapp://send?text="+p.url;
				facelink.href = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(p.url)+"&t=victorribeiro.com/memes";
				content.appendChild( img );
			
			}else if(p.url.search(/youtube\.com\/watch/i) != -1){ https://youtu.be/BskKbs_BHNg"

				p.url = p.url.replace('watch?v=','embed/').replace(/\&.*/, '');

				let iframe = document.createElement('iframe');
				iframe.width = 420;
				iframe.height = 315;
				iframe.src = p.url;
				
				whatslink.href = "whatsapp://send?text="+p.url;
				facelink.href = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(p.url)+"&t=victorribeiro.com/memes";
			
				content.appendChild( iframe );
			}else if(p.url.search(/youtu\.be\//i) != -1){
			
				let url = p.url.replace('youtu.be/','youtube.com/embed/');

				let iframe = document.createElement('iframe');
				iframe.width = 420;
				iframe.height = 315;
				iframe.src = url;
				
				whatslink.href = "whatsapp://send?text="+p.url;
				facelink.href = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(p.url)+"&t=victorribeiro.com/memes";
			
				content.appendChild( iframe );
			}else if( p.url.search(/gfycat\.com\//i) != -1) {
			
				let url = p.url.replace('gfycat.com/','gfycat.com/ifr/');
				let iframe = document.createElement('iframe');
				iframe.width = 420;
				iframe.height = 315;
				iframe.src = url;
				whatslink.href = "whatsapp://send?text="+p.url;
				facelink.href = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(p.url)+"&t=victorribeiro.com/memes";
				content.appendChild( iframe );
			
			}else{
				let url = p.url.replace(/\&amp;/g,'&').replace(/\&quest;/g,'?');
				let link = document.createElement('a');
				link.href = url;
				whatslink.href = "whatsapp://send?text="+url;
				facelink.href = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(url)+"&t=victorribeiro.com/memes";
				link.target = "_tab";
				
				let linkclass = document.createElement('div');
				linkclass.classList.add('link');
				linkclass.title = "Link";
				
				let img = new Image();
				if(p.preview.images[0].source.url){
					img.src = p.preview.images[0].source.url.replace(/\&amp;/g,'&').replace(/\&quest;/g,'?');
				}else{
					img.src = p.thumbnail;
				}
			
				link.appendChild( img );
				link.appendChild( linkclass );
			
				content.appendChild( link );
			}
		
			facelink.appendChild( facebook );
			whatslink.appendChild( whatsapp );
		
			post.appendChild( title );
			post.appendChild( content );
			post.appendChild( whatslink );
			post.appendChild( facelink );
			main.appendChild( post );
		}
		catch(e){
			console.error(p, e.message);
		}
	}
}

function getData(d){
	let main = document.getElementById('main');
	main.innerHTML = "";
	for(child of d.data.children){
		createPost(child.data);
	}
	state.beforeUrl = state.baseUrl+'?count='+state.page+'&before='+d.data.before;
	state.afterUrl = state.baseUrl+'?count='+state.page+'&after='+d.data.after;
}

function play(ele){
	if(ele.children[0].paused){
		ele.children[0].play();
		ele.children[1].style.visibility = "hidden";
	}else{
		ele.children[0].pause();
		ele.children[1].style.visibility = "visible";
	}
}

document.getElementById('prev').addEventListener('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	if( state.page > 25 ){
		state.page -= 25;
		state.currentUrl = state.beforeUrl;
		getLink(state.beforeUrl);
		window.scrollTo(0,0);
	}
});

document.getElementById('next').addEventListener('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	state.page += 25;
	state.currentUrl = state.afterUrl;
	getLink(state.afterUrl);
	window.scrollTo(0,0);
});

document.getElementById('home').addEventListener('click',function(e){
	getLink(state.baseUrl)
	window.scrollTo(0,0);
});

};
