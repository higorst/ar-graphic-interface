from __main__ import app
from flask import request
from codes.methods import formatResponse, generateHash, get_db_connection

# retornar todos os ensaios cadastrados
@app.route('/experiments/training/result/data', methods=['GET'])
def getResults():
  idTraining = request.args.get('idTraining', default=1)

  conn = get_db_connection()
  data = conn.execute('''SELECT r.*, (
        SELECT 
          title
        FROM experiments e
        WHERE e.id = r.idExperiment
      ) as experimentTitle''' + " FROM results r WHERE idTraining='%s'" % idTraining).fetchall()
  conn.close()
  response = []
  for d in data:
    response.append(
      {
        "id": d["id"], 
        'experiment': {"title": d["experimentTitle"]},
        'idExperiment': d["idExperiment"],
        'idTraining': d["idTraining"],
        'orderR': d["orderR"],
        'gf': d["gf"],
        'gs': d["gs"],
        'sg': d["sg"],
      }
    )
  return formatResponse(False, response)

# retorna o resumo de um ensaio
@app.route('/experiments/training/result/resume', methods=['POST'])
def getResultsResume():
  data = request.get_json()
  idTraining = data["idTraining"]

  conn = get_db_connection()
  data = conn.execute("SELECT sg, gf, gs FROM results WHERE idTraining='%s'" % idTraining).fetchall()
  conn.close()
  response = []
  victories = 0
  defeats = 0
  draws = 0
  gs = 0
  gf = 0
  sg = 0
  for d in data:
    victories += 1 if d["sg"] > 0 else 0
    defeats += 1 if d["sg"] < 0 else 0
    draws += 1 if d["sg"] == 0 else 0
    gf += d["gf"]
    gs += d["gs"]
    sg += d["sg"]
  response.append(
    {
      "victories": victories, 
      'defeats': defeats,
      'draws': draws,
      'gf': gf,
      'gs': gs,
      'sg': sg,
    }
  )
  return formatResponse(False, response)
