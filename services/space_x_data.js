class SpaceXData {
    uri = 'https://api.spacexdata.com/v5/';


    latestLaunchImage() {
        return fetch( this.uri + 'launches/latest')
            .then(res => res.json())
            .then(data => data.links.patch.large);
    }
}

export default SpaceXData;
