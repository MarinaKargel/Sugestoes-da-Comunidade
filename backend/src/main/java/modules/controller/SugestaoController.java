package modules.controller;

import modules.dto.SugestaoDto;
import modules.exception.ResourceNotFoundException;
import modules.model.Sugestao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import modules.repository.SugestaoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sugestao")
public class SugestaoController {

    @Autowired private SugestaoRepository sugestaoRepository;

    @GetMapping
    public List<Sugestao> indexSugestoes(){
        return sugestaoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sugestao> loadSugestaoById(@PathVariable Long id) throws ResourceNotFoundException {
        var sugestao = sugestaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sugestão não existe sob o id: " + id));
        return ResponseEntity.ok(sugestao);
    }

    @PostMapping
    public Sugestao saveSugestao(@RequestBody SugestaoDto sugestaoDto) {
        var sugestao = new Sugestao();
        sugestao.setTitulo(sugestaoDto.getTitulo());
        sugestao.setDescricao(sugestaoDto.getDescricao());
        return sugestaoRepository.save(sugestao);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Sugestao> updateSugestao(
            @PathVariable Long id,
            @RequestBody SugestaoDto sugestaoDto
    ) throws ResourceNotFoundException {
        var sugestao = sugestaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sugestão não existe sob o id: " + id));
        sugestao.setTitulo(sugestaoDto.getTitulo());
        sugestao.setDescricao(sugestaoDto.getDescricao());
        var updatedSugestao = sugestaoRepository.save(sugestao);
        return ResponseEntity.ok(updatedSugestao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteSugestao(@PathVariable Long id) throws ResourceNotFoundException {
        var sugestao = sugestaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sugestão não existe sob o id: " + id));
        sugestaoRepository.delete(sugestao);
        return ResponseEntity.ok(Boolean.TRUE);
    }

}
