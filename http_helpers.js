let collectData = (req, clbck) => 
{
    let data = ''
    req.on('data', chunk => data += chunk)
    req.on('end', () => clbck(data))
}

module.exports = { collectData }