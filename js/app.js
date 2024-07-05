const apiKey = "AIzaSyBhR30oVHaNledjSIRAWQftvOOKj_etUj4";

        async function fetchVideos(query) {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=10`);
            const data = await response.json();
            return data.items;
        }

        function createVideoElement(video) {
            const videoElement = document.createElement('li');
            videoElement.classList.add('videos-li');
            console.log(video);

            videoElement.innerHTML = `
                <a class="videos-link" href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <div class="videos-box">
                        <img class="videoImg" src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" width="400" height="224">
                        <div class="video-infos">
                            <div class="video-info-left">
                                <img class="channel-img" src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.channelTitle}" width="36" height="36">
                            </div>
                            <div class="video-info-right">
                                <h3 class="video-title">${video.snippet.title}</h3>
                                <p class="channel-name">${video.snippet.channelTitle}</p>
                                <p class="video-viewers-and-date">Published at: ${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            return videoElement;
        }

        async function handleSearch() {
            const searchInput = document.getElementById('searchInput');
            const videosUl = document.getElementById('videosUl');
            const query = searchInput.value;

            videosUl.innerHTML = '';

            if (query) {
                const videos = await fetchVideos(query);
                videos.forEach(video => {
                    const videoElement = createVideoElement(video);
                    videosUl.appendChild(videoElement);
                });
            }
        }

        document.getElementById('searchButton').addEventListener('click', handleSearch);
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });