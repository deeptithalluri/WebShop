// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if (req.method == "POST") {
    res.status(200).json({
      status: 'ok',
      trackID: "track_" + Math.random().toString(6).substring(15),
      orderID: "order_" + Math.random().toString(6).substring(15),
      orderDate: new Date()
    })
  }
}
