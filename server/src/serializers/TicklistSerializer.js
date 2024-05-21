class TicklistSerializer {

  static async getTickWithClimbName(tick) {
    const allowedAttributes = ["id", "userId", "climbId", "notes", "date"]
    const serializedTick = {}

    for (const attribute of allowedAttributes) {
      serializedTick[attribute] = tick[attribute]
    }

    const climb = await tick.$relatedQuery("climb")
    serializedTick.climbName = climb.name

    return serializedTick
  }
}

export default TicklistSerializer